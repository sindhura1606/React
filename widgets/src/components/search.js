import React,{useState,useEffect} from 'react';
import Axios from 'axios';


/* search widget
1. take an user input
2. make an Api request
3. Map over the results
4. show the results on the screen 
*/

const Search=()=>{
/* we will assign a value prop to input field.
   we will assign an onchange event handler. Anytime input value is changed we are going to update the state.
   The state keeps track of value of the input. when component re-renders updated input value is seen.
*/

/* We have used useState to update state when term chanes.
    ---- When do we search the term now? -----  
1. User Types in Input
2. onChange event Handler Called
3. update 'term' piece of state.
4. component rerenders
5. Add code to detect the term has changed! - useEffect
6. Make request to API
7. Get response
8. Update 'results' piece of state.
9. Component rerenders  show list of results.
*/

const [term,setTerm]= useState('program');
//creating a state to store results from api
const [results,setResult]= useState([]);
//syntax useEffect(function argument, []/[data]/nothing)
//refer to notes for explaination

    useEffect(()=>{
        const searchTerm = async()=>{
            const{data} = await Axios.get('https://en.wikipedia.org/w/api.php', {
            params:{
                action: 'query',
                list: 'search',
                origin: '*',
                format: 'json',
                srsearch: term,
                },
            });
            setResult(data.query.search);
        };

        /* Setting a timer to avoid making too many Api request when user is typing.
        1. on first input, wait for 500ms and call the serach function.
        2. If there is any other keypress/inputchange within 1000ms, cancel the previos timer
        3. setTimeout again for the new input in 1000ms.
        4. Every setTimeout will have an ID and we are having that stored into timeoutId below.
        5. We can make use of this timeoutId to cancel the previous timer.
        */

        //But this delay of 1000ms to make an Api request also delays initial rendering.
        //this is how we make a serach on initial render without delay and follow the timeout for subsequent searches.
        
        if(term && !results.length){
            searchTerm();
        }
        else{
            const timeoutId=setTimeout(() => {
                if(term){
                    //only search with a term
                    searchTerm();
                }       
            }, 1000);
        /* we can return a function from useEffect function  
        1. on Initial Render, function provided to useEffect gets called, which returns a function.
        2. On re-render, returned function is invoked and again useEffect gets called, which again returns a function
        3. Returned function from useEffect is where we will cancel the previous timer.
        */
        return()=>{
            clearTimeout(timeoutId)
            };
        }
    },[term]);
    //<span dangerouslySetInnerHTML={{__html:result.snippet}}></span> causes possible XSS Attack.
    //XSS- cross site scripting
    //<a> tag links the returned search article to wikepedia page on clicking button GO.
    
    const renderedResults = results.map((result) => {
        console.log(result)
        return (
          <div key={result.pageid} className="item">
              <div className="right floated content">
                  <a className="ui button" href={`https://en.wikepedia.org?curid=${result.pageid}`}>Go</a>
              </div>
            <div className="content">
              <div className="header">{result.title}</div>
              <span dangerouslySetInnerHTML={{__html:result.snippet}}></span>
            </div>
          </div>
        );
      });

    return (
    <div>
        <div className="ui form">
            <div className="field">
                <label>Enter Search Term:</label>
                <input value={term} onChange={(e)=>setTerm(e.target.value)} className="input" />
            </div>
        </div>
        <div className="ui celled list">{renderedResults}</div>
    </div>
    );
};

export default Search;
