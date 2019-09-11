import React, {useState} from "react";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import { TextField, Tooltip } from '@material-ui/core';
import 'assets/css/ClaimPage.css';
const Claims = (props) => {
  const [contentAdd, setContentAdd] = useState("Type in to enter claims")
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
        name: currentcontent,
        id: myItems.length+1,
        itemWidth: currentWidth + 2,
        verified: false
      });
      setMyItems(newArray);
      setContentAdd("");
    }
  }

  const handleBlur = (event) => {
    setContentAdd("Type in to enter claims");
  }

  const handleCancelClick = (idToRemove) => {
    // console.log(idToRemove);
    // const idToRemove = Number(event.target.dataset["item"]);
    // console.log(myItems);
    const newArray = myItems.filter((listitem) => { return listitem.id !== idToRemove });
    setMyItems(newArray);
  }

  const addClaims = () => {
    // axios.post("/api/dashboard/addClaim", { claims: this.state.myItems }).then(res => {
    //   this.setState({
    //     alertMessage: <Alert>{res.data.message}</Alert>
    //   })
    // });
    props.submitNewClaim(myItems);
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
          <Tooltip title={"Hit Enter to confirm, Click a pill to remove and click on Update Claims to update it."}>
            <TextField
            variant="outlined"
              id="add"
              type="text"
              name="initvalue"
              onFocus={handleFocus}
              onChange={handleChange}
              onKeyPress={handleKeypress}
              onBlur={handleBlur}
              value={contentAdd}
            />
            </Tooltip>

        <span style={{ whiteSpace: "pre", visibility: "hidden", position: "absolute", pointerEvents: "none" }} ref={el => (helperspan = el)}>
          {contentAdd}
        </span>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        {myItems.map((listitem, index) => {
          return(
            <li
              key={listitem.id}
              className="claimList"
              onClick={(e) => handleCancelClick(listitem.id)}
              style={{ color: "black", borderColor: listitem.verified ? 'green' : 'red' }}
            >
              {listitem.name}
            </li>
          )
        })}
          <br/>
        <Button color="primary" onClick={addClaims}>Submit Claims to Blockchain</Button>
        </GridItem>
        </GridContainer>
  );
}

export default Claims;
