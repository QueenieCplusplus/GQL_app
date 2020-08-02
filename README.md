# GQL_app
Graph QL

ref: https://www.sitepoint.com/how-to-build-a-web-app-with-graphql-and-react/

# Jump-Try

快速的玩法是使用 cURL 抓取資料建構網頁，並用 graphql-request 套件建構 app 內容。

# Apollo || Relay

兩者都是用來解決 GQL 沒有多的路由的問題，每一個資料都是用單一端點傳送與接收的，所以無法將路由回傳的資料放在用來請求它的 url 底下，而 Apollo 或是 Relay 這兩個方案提供了（使用本地化）快取的解決方案。

Relay 是 FB 的經驗共享，只與 React 和 React-Native 相容，也推薦使用。
Apollo 支援 React、 iOS、 Android。

* Apollo Client

         import { gql } from 'apollo-boost'

* Apollo Cache

  * 使用 Cache: 能減少網路請求，避免使用者發出無關緊要的請求。
  
  * 建立 Cache: 當我們傳送操作時，回應將會被儲存到本地快取。可使用 fetchPolicy 告知 Apollo Client 去哪裡尋找
                解析操作所需要的資料（本地或是遠端）。通常，預設為 cache-first，倘若資料不在本地端，方才發出網路請求。
                fetchPolicy 的屬性是在 Query 元件中設定。除了 cache-frist 外，尚有其他可選，如 cache-only、
                network-only、no-cache (不會將結果存放在本地快取內)、cache-and-network 策略則一定先使用 cache 
                並且同時發出網路請求。
  
  * 保存 Cache
  
  * 更新 Cache

# use GQL API

使用 Query 元件對資料 select ; 使用 Mutation 元件對資料做 update, delete, create。
使用時會先創建 gql 特有的 type，如下的 a_mutaion_type 和 a_query_type。

        import { request } from 'graphql-request'

        var a_query_type = `

           query listUsersInfo {

                allUsers {

                    name
                    avatar

                }

           }


        `

        var a_mutaion_type = `

            mutation pop($id: Int!){

                addUser(id: $id){

                    //id 
                    //name
                    //mailaddress
                    githubLogin


                }

            }

        `

        request('http://localhost:4000/user', a_query_type)
                .then(cosole.log)
                .catch(console.error)

        let url = 'http://localhost:4000/user'

        var vary_id = {id: 318}

        request(url, mutation, vary_id)
                .then(console.log)
                .catch(console.error)
                
                
# GQL & React

匯入模組，建立 App 元件，App 會對應以屬性傳入的 users，接著建立含有 user 的 avatar 和 name 的 div 元素。
render 函數中 ReactDOM.render 會將 App 運算繪製到 #root 元素內，並以特性將 allUser 傳入。

按鈕有個 onClick 事件，呼叫 addUser 函式，呼叫時會傳送 mutation 元件，並且回傳時會呼叫 methodCalled 這
函式為使用者發出 render 函式的需求，並且用新的使用者串列 allUsers =[] 來為 App 運算繪製 <App/>。

        import React from 'react'
        import ReactDOM from 'react-dom'
        import obove mentioned module or codeline

        const App = ({ users = [] }) => 

                <div>

                      {fetch data hereby}

                      <button onClick = {addUser}/>

                </div>
                
         const render = ({ allUsers =[] }) => 
               
               ReactDOM.render(
               
                   <App users = { allUsers } />,
                   document.getElementById('root')
               
               
               )
               
          const addUser = () => 
               
               request(url, mutation, {id: 318})
                  .then(methodCalled)
                  .catch(console.error)
                  
                  
          const methodCalled = () =>
                
                request(url, query)
                   .then(render)
                   .catch(console.error)
            
          methodCalled()
                   

# map loop

如上 {fetch data hereby} 物件的程式碼如下

        { users.map ( user => 

               <div key={user.githubLogin}>
                    
                    <img src={user.avatar} alt="" />
                    
                    {user.name}

               </div>

        }

# Code

1. add dependency

        "dependencies": {
          "@apollo/react-hooks": "^4.0.0",
          "@testing-library/jest-dom": "^4.2.4",
          "@testing-library/react": "^9.5.0",
          "@testing-library/user-event": "^7.2.1",
          "apollo-cache-inmemory": "^1.6.6",
          "apollo-client": "^2.6.10",
          "apollo-link-http": "^1.5.17",
          "graphql": "^15.3.0",
          "graphql-tag": "^2.11.0",
          "react": "^16.13.1",
          "react-apollo": "^3.1.5",
          "react-dom": "^16.13.1",
          "react-scripts": "3.4.1"}
    
    
2. // index.js

 create apollo server instance in index.js & wapper of App comopnent & ApolloProvider component

                import React from 'react';
                import ReactDOM from 'react-dom';
                import './index.css';
                import App from './App';
                import * as serviceWorker from './serviceWorker';
                import {ApolloClient} from 'apollo-client';
                import { InMemoryCache } from 'apollo-cache-inmemory';
                import { ApolloProvider } from '@apollo/react-hooks';

                const cache = new InMemoryCache();
                const client = new ApolloClient({cache, uri:''})

                ReactDOM.render(
                  <ApolloClient client = {client}>
                    <App />
                  </ApolloClient>,
                  document.getElementById('root')
                );

3. // component_name.js

 use { useQuery } hook , which is a hook to fetch gql query and expose result to render

        import React from 'react';
        import logo from './logo.svg';
        import './App.css';

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

4. add style sheet CDN link in public/index.html

   index.html is related to index.js
   
           import ReactDOM from 'react-dom';

                ReactDOM.render(
                  元件,
                  document.getElementById('root')


