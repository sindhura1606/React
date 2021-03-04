import React,{useState} from 'react';
//usestate func from React lib gives state system functionality to function component.

const Accordion=({items})=>{

     /*  React Hooks system- using setState 
            1. just as we initialize state object in class using state={activeIndex=null};
            - here we initialzed like this const [activeIndex,setActiveIndex]=useState(null);
            - here we are using array destructuring syntax with useState initialization.
            - first var activeIndex we are using is to keep track of our state.  It is a reference to some var that is going to change overtime.
            
            2. just as we updtae state using setState({activeIndex:index})
            -here we use a different var name called setActiveIndex to update the value of the state.
            - second variable setActiveIndex is actually a function that we call to update our state.

            3.just as we can access the this.state.activeIndex inside render of class component
            -here inside the return we access the updated state activeIndex.
    */

    const [activeIndex,setActiveIndex]=useState(null);

    //helper function
    //while invoking this function below, use arrow functions to actually invoke this when the title is clicked later point in time.
    //if invoked like this onclick={onClickTitle(index)}, it displays the function right away when component renders without title even being clicked.
    const onTitleClick=(index)=>{
        setActiveIndex(index);
        //console.log("Title "+index+" is clicked");
    }


    const renderedItems= items.map((item, index)=>{
     /*
    1. class active is what actually expands the dropdown and displays the content.
        - we have semantic-min-css cdn link in our index.html which provides this default css behaviour like dropdowns.
    2. if index==activeIndex i.e index that we clicked then display the content.
    */

    const active= index===activeIndex?'active':'';
        return (
        <React.Fragment key={item.title}>
            <div className={`title ${active}`} onClick={()=>onTitleClick(index)}>
                <i className="dropdown icon"> </i>
                {item.title} 
            </div>

            <div className={`content ${active}`} >
                {item.content} 
            </div>
        </React.Fragment>
        )
    });

    return (
        <div className="ui styled accordion">
            {renderedItems}
        </div>
    );
  
}

export default Accordion;