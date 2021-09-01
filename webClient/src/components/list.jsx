import React, { Component } from 'react';
import Item from './item.jsx';
import AddItem from './addItem.jsx';

const defaultName = "New Item";
let initialItems = [
  { "name": "You shouldn't be seeing this",
    "id": -1,
    "qty": 0,
    "bought": false
  }
]

class List extends Component {
    state = {
      items: initialItems
    }

    //Fetches data from the Node side                              
    async callAPI() {
      try {
        let response = await fetch(this.props.backEndURL || "http://localhost:3002/");
        let responseJSON = await response.json();
        this.setState({ items: responseJSON.items })
      } catch (error) {
        console.error(error);
      }
    }

    //When the List is inserted into the DOM
    componentDidMount() {
      this.callAPI();
    }


    //======================== Custom functions and methods ======================
    zeroFormat = (input) => {
        return(input === 0 ? '0' : input);
    }

    // Note that the deletion here updated correctly when made async
    // could it be that some setState's require waiting that significant of an amount?
    handleDelete = async (itemID) => {
      var updatedItems = [...this.state.items];
      updatedItems = updatedItems.filter((item) => item.id != itemID ); 
      await this.setState({ items: updatedItems });
      this.saveToBackEnd();
    }    

    handleAdd = () => {
      let { items } = this.state;

      // sort the items by id size, and then make the new id larger than all of them
      let updatedItems = items.sort( (item1, item2) => {return(item1.id - item2.id)} );
      const newID = updatedItems[updatedItems.length-1].id + 1;
      let newItem = {
        name: defaultName,
        id: newID,
        qty: 0,
        bought: false
      }
      items.unshift(newItem);
      this.setState({ items: items });
      this.saveToBackEnd();
    }

    handleUpdate = async (name, id, qty, bought/*, qtyMax*/) => {
      let updatedItems = [...this.state.items];
      let specificItem = updatedItems.filter( (item) => item.id === id )[0];
      
      specificItem.name = (name === "" ? defaultName : name);
      specificItem.bought = bought;
      specificItem.qty = (qty === "" ? '0' : qty);
      
      updatedItems[updatedItems.indexOf(specificItem)] = specificItem;
      
      // TODO: Immediate visual reactions that should have occured by forceUpdate() or this.setState
      // did not; probably because props and state can be updated asynchronously; therefore they might not 
      // be in sync so we need an arrow function.
      // The was changed so that this is not an immediate issue
      await this.setState({ items: updatedItems });
      
      this.saveToBackEnd();
    }

    saveToBackEnd() {      
      fetch(this.props.backEndURL || "http://localhost:3002/", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      })
      .then( (response) => { console.log(response) })
      .catch( (error) => { console.error(error) })

      // don't worry about  vvv  this, it was a precaution if needed to send all the way up 
      // this.props.sendListDataUpToParent(this.state);
    }

    render() {
        const renderFakeCheckoutButton = () => {
          if (this.props.canEdit) {
            return(<button type="button" class="btn btn-primary position-relative m-3" style={{padding: '10px', fontSize: '16px', backgroundColor: "#343644"}}>
                     Checkout
                      <span class="visually-hidden"></span>
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      Total Items: {this.state.items.length}
                    </span>
                  </button>)
          } else return;
        }

        const renderAddItemButton = () => {
          if (this.props.canEdit) {
            return(<AddItem 
                      onAdd={this.handleAdd}>
                    </AddItem>)
          } else return;
        }

        const renderOnlyBoughtItems = () => {
          // if you can't edit the items (i.e. you are on the actual list) then
          // only map and display those which were bought 
          let specificItemList = this.state.items;
          if (!this.props.canEdit) specificItemList = this.state.items.filter( item => item.bought);

          return(specificItemList.map( (item, i) => 
                  <Item 
                key={item.id} 
                id={item.id} 
                initName={item.name}
                qty={this.zeroFormat(item.qty)}
                qtyMax={this.zeroFormat(item.qtyMax)}
                bought={item.bought}
                defaultName={this.defaultName}
                zeroFormat={this.zeroFormat}
                onDelete={this.handleDelete} 
                onUpdate={this.handleUpdate}
                canEdit={this.props.canEdit}
              /> 
                  //Children (<span/>, etc.) could go here ^^^ (access them in Item via this.props.children)
            ));
        }

        return(
              <div>
                  <ul>
                      {renderFakeCheckoutButton()}
                      {renderAddItemButton()}
                      {renderOnlyBoughtItems()}
                  </ul>
              </div>
        );
    }
}

export default List;
