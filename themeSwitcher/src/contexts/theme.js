import {createContext,useContext,UserContext} from 'react'

// here we pass a default value in the createContext
export const ThemeContext=createContext({
    themeMode:'light',
    darkTheme:()=>{},
    lightTheme:()=>{}
})

export const ThemeProvider =ThemeContext.Provider

// custom hook
export default function useTheme(){
    return useContext(ThemeContext )
}


// at production time we make just this single file instead of making two seperate files 