// (3) 2020, 7/30  fetch data by using useQuery Hook

import React from 'react';
import logo from './logo.svg';
import './App.css';
// @@@ useQuery hook
// this is a hook to fetch gql query and expose result to render
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {Fragment} from 'React';


// to fetch data of first 10 users
const GET_INFO = gql`
{
  user(first:10){
    name,
    avatar,
    mail,
    phone_number,
    detail {
      fb_id,
      twitter_id
    }
  }
}
`
function App() {

  const {data, loading, error} = useQuery(GET_INFO);

  if(loading) return <p> Loading... </p>
  if(error) return <p> Error </p>


  return (
    
     // map((val, index, array) => ())
    <Fragment>
      <div>
        {data && data.user && data.user.map((res_val, index) =>(

          <div>

            <p>{res_val.name}</p>

            <p>{res_val.detail && res_val.detail.length !== 0 && (
              <p>
              {""}

              Users Detail:

              {res_val.detail.map((sub_res_val, index)=>{

                  return <p key={index}> {sub_res_val.fb_id} </p>;

              })}
              </p>
            )}</p>

          </div>

        ))}

      </div>
    </Fragment>
    
  );
}

export default App;
