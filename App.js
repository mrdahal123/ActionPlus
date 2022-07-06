import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './Navigations/StackNavigation/StackNav';
import MainNav from './Navigations/StackNavigation/MainNav';

function App() {
// const initialLoginState = {
//   isLoading:true,
//   userName:null,
//   userToken:null,
// }

// const LoginReducer = (prevState,token) => {
//   switch (action.type) {
//     case 'RETRIEVE_TOKEN':
//       return{
//         ...prevState,
//         userToken:action.token,
//         setIsLoading:false
//       };
//     case 'SignIn':
//       return{
//         ...prevState,
//         userName:action.id,
//         userToken:action.token,
//         setIsLoading:false
//       };
//     case 'SignOut':
//       return{
//         ...prevState,
//         userName:null,
//         userToken:null,
//         setIsLoading:false
//       };
//     case 'Register':
//       return{
//         ...prevState,
//         userName:action.id,
//         userToken:action.token,
//         setIsLoading:false
//       };
//   }
// }

// const [loginState,dispatch] = React.useReducer(LoginReducer,initialLoginState)

//   const authContext = React.useMemo(() => ({
//     signIn: () =>{
//       userToken("token");
//       setIsLoading(false);
//     },
//     signOut: () =>{
//       userToken(null);
//       setIsLoading(false);
//     },
//     signUp: () =>{
//       userToken("token");
//       setIsLoading(false);
//     } 
//   }),[])

  return (
    <MainNav/>
  );
}

export default App;