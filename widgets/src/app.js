import React,{useState} from 'react';
import Accordion from './components/Accordion';
import Dropdown from './components/Dropdown';
import Search from './components/search';
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Navigation';
/* In this widget application we are building 4 seperate widgets called Accordion,searchbar,
dropdown and Translate. Then we will wire them together in the navigation bar.

1. Accordion widget: It is just a list of 3 q&a where only 1 question expands at a time
when user clicks on it.
- we used useState Hook to build our Accordion component.

2. Search widget: When user types in something onto searchbar, 
we make an fetch request to api and display the content on screen.
-we used useState and useEffect Hook to build our Search widget component.

3.

*/

const items=[
    {
        title:'what is react?',
        content: 'React is an front-end Javascript Framework'
    },

    {
        title:'why do we use react?',
        content:'React makes writing js code easier'
    },

    {
        title: 'how do we use react?',
        content:'we create something called react components'
    }
]

const colors=[
    {
        label: 'color red',
        value:'red'
    },
    {
        label: 'color blue',
        value:'blue'
    },
    {
        label: 'color green',
        value:'green'
    }
]

//<Accordion items={items} />
//<Search />
export default () => {
    //passing state as a prop to Dropdown.
     /*dropdown has
                1. currently selected item
                2. callback to change current selection
                3. list of options */
    const [selected, setSelected] = useState(colors[0]);

    return(
      <div>
        <Header />
        <Route path='/'>
          <Accordion items={items} />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/Translate'>
          <Translate />
        </Route>
        <Route path='/Dropdown'>
              <Dropdown
                selected={selected}
                onSelectedChange={setSelected}
                options={colors}
              />
        </Route>
      </div>
    );
};
