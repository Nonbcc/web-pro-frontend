import React, {useState} from 'react'

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) =>{
      e.preventDefault();
      props.history.push(`/search/name/${name}`);
  }
  return (
      <div className='topnav'>
        <form className='search-container' onSubmit={submitHandler}>
            <div>
                <input type='text' name='q' id='q' placeholder="Search.." onChange={(e) => setName(e.target.value)}></input>
                <button className='search_button' type='submit'>
                    <i className='fa fa-search'></i>
                </button>
            </div>
        </form>
      </div>
  )
}
