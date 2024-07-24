function makingReactElement(type,props,children){
   let reactElement={
        'type':type,
        'props':props,
        'children':children
    }
    return reactElement
}

function creatingRootByClass(rootName){
                 const root=document.querySelector(`.${rootName}`)
                 return root
         }


function elementRender(rootElement,reactElement){
    let ele = document.createElement(reactElement['type'])
    for (let prop in reactElement.props) {
        ele.setAttribute(prop,reactElement.props[prop])
    }
    ele.innerText=reactElement.children
    rootElement.appendChild(ele)

}


// Export the functions to be used in other files
export { makingReactElement, creatingRootByClass, elementRender };