import React,{useEffect, useRef, useState} from 'react';

/* 
Dropdown component will have list of color options.
The text below changes to the color selected in the Dropdown. 
Our Dropdown will be a reusable component
which takes color options from App component.
*/


const Dropdown = ({ options, selected, onSelectedChange }) => {

  //Hiding and Showing the option list
  //classes 'visible active' are responsible for showing the dropdown. Hence we add these classes only when user clicks on an option. 
  const [open,setOpen]=useState(false);
  const ref = useRef();

  //setting up manual event listener on body element.
  useEffect(() => {
    const onBodyClick = (event) => {
      //if the slected item i.e event.target is inside the ref.current i.e inside the react element structure,
      //then do not do anything.
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick);

    /* whenever dropdown component is removed, ref.current evaluates to null,but body.addEventListener still executes.
    1. To avoid this, we will have to add a cleanup function to the Body Event Listener.
    2. When component is first rendered, useEffect will add an eventlistener to body and also returns a cleanup function.
    3. When component is removed from DOM, react automatically calls this clean up function.
    */
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    //if an option is selected in the dropdown list, do not show the option in dropdown again.
    if(option===selected){
      return null;
    }
      return (
        <div
          key={option.value}
          className="item"
          onClick={() => onSelectedChange(option)}
        >
          {option.label}
        </div>
      );  
  });

  /* Event Bubbling - An Event bubbles up to the DOM structure. 
    1. the dropdown needs to detcect the click event anywhere on the screen i.e on any dom element.
    2. once detected dropdown needs to be closed, showing only the selected option.
    3. right now we were able to show and hide the option list only when clicked on the dropdown options.
    4. we acheived this using two onClick event Handlers- onSelectedChange, setOpen.
    5. Dropdown has hard time tting up event handlers on elements that it doen not create.
    6. React component creates React elements not DOM elements. But React elements inside JSX are converted to DOM elements.
    7. However, when event bubbles up react cannot set up any events on DOM elements. It only invokes the event handlers defined on React elements.

    -- How do we do this?
    1. Dropdown can set up a manual Event listener(without React) on the body element.
    2. As click on any element will bubble up to the Body element inside the DOM.
    3. If user clicks on any of the elements created inside dropdown component, we do not want body event listener to do anything.
    4. If the click was outside the Dropdown element , we want body element event listener to respond.
    5. for this, we need to figure out what element was clicked and whether that element is inside the dropdown.
 
    -- Solution!!
    1. useRef: react cannot access the Dom elements that were created using React JSX.
    2. Ref in react will give direct access to DOM elements that were created using React JSX.
    3. Ref inside div below gives direct ref to top level react element inside dropdown component. 
    */


return (
  <div ref={ref} className="ui form">
    <div className="field">
      <label className="label">Select a Color</label>
      <div
        onClick={() => setOpen(!open)}
        className={`ui selection dropdown ${open ? 'visible active' : ''}`}
      >
        <i className="dropdown icon"></i>
        <div className="text">{selected.label}</div>
        <div className={`menu ${open ? 'visible transition' : ''}`}>
          {renderedOptions}
        </div>
      </div>
    </div>
  </div>
);
};


export default Dropdown;