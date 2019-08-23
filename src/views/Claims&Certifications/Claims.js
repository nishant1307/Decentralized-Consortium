import React, {useState} from "react";
import {
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Button,
  FormText,
} from 'reactstrap';
import TextField from '@material-ui/core/TextField';

const Claims = () => {
  const [contentAdd, setContentAdd] = useState("Add claim +")
  const [myItems, setMyItems] = useState([]);

  let helperspan = null;
  let lastId = -1;

  const handleFocus = (event) => {
    setContentAdd("");
  }

  const handleChange = (event) => {
    const usr_input = event.target.value;
    setContentAdd(usr_input);
  }


  const handleKeypress = (event) => {
    if (event.key == "Enter") {
      var newArray = myItems;
      var currentcontent = contentAdd.trim();
      if (!currentcontent) {
        return;
      }

      var currentWidth = helperspan.offsetWidth;
      newArray.push({
        content: currentcontent,
        id: ++lastId,
        itemWidth: currentWidth + 2,
        verified: false
      });
      setMyItems(newArray);
      setContentAdd("");
    }
  }

  const handleBlur = (event) => {
    setContentAdd("add +");
  }

  const handleCancelClick = (event) => {
    const idToRemove = Number(event.target.dataset["item"]);
    const newArray = myItems.filter((listitem) => { return listitem.id !== idToRemove });
    setMyItems(newArray);
  }

  const addClaims = () => {
    axios.post("/api/dashboard/addClaim", { claims: this.state.myItems }).then(res => {
      this.setState({
        alertMessage: <Alert>{res.data.message}</Alert>
      })
    });
  }
  return (
    <ListGroup>
      <ListGroupItem>
        <Row>
          <Col sm="12" xl="5">
            <TextField
            variant="outlined"
              id="add"
              type="text"
              name="initvalue"
              autoComplete="off"
              maxLength="1000"
              onFocus={handleFocus}
              onChange={handleChange}
              onKeyPress={handleKeypress}
              onBlur={handleBlur}
              value={contentAdd}
            />
          </Col>
          <Col sm="12" xl="7">
            <h6> Hit "Enter" to confirm, Click a pill to remove and click on Update Claims to update it.</h6>

          </Col>
        </Row>

        <span style={{ whiteSpace: "pre", visibility: "hidden", position: "absolute", pointerEvents: "none" }} ref={el => (helperspan = el)}>
          {contentAdd}
        </span>
      </ListGroupItem>
      <ListGroupItem>
        {
          myItems.map((listitem, index) => {
            return(
              <li
                key={listitem.id}
                className="claimList"
                onClick={handleCancelClick}
                data-item={listitem.id}
                style={{ color: "black", borderColor: listitem.verified ? 'green' : 'red' }}
                value={listitem.content}
              >
                {listitem.content}
              </li>
            );
          })}
      </ListGroupItem>
      <ListGroupItem>
        <Button color="primary" onClick={addClaims}>Update Claims</Button>
      </ListGroupItem>
    </ListGroup>
  )
}

export default Claims;
