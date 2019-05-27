import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ItemModal from "./ItemModal";

class ShoppingList extends Component {
  onDeleteItem = id => {
    this.setState({
      item: this.props.deleteItem(id)
    });
  };

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.item;
    return (
      <div>
        <Container>
          <ItemModal />
          <ListGroup>
            <TransitionGroup className="shopping-list">
              {items.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteItem.bind(this, _id)}>
                      &times;
                    </Button>
                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
      </div>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    item: state.item
  };
};

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
