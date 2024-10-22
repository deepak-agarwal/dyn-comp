import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
// import generatedComponents from '../../data/generated_component.json'
import ErrorBoundary from "../errorBoundary";
import "./style.css";
function getChatInitMessage(messages: Array<any>) {
  return messages.map((message) => {
    console.log(message);
    return { chatTitle: message.prompts[0][0].prompt, _id: message._id };
  });
}
export default function GeneratedComponentsList({
  setActiveCompId,
  activeCompId,
  userChatData,
  setActiveCompTitle,
}) {
  const [componentImports, setComponentImports] = useState([]);

  // useEffect(() => {
  //   // Load child components dynamically based on the JSON data
  //   // const imports = generatedComponents.components.map(async (item) => {
  //     // Construct the import path for each child component
  //     // console.log(item)
  //     // try {
  //     //   // Use dynamic import to load the component, and catch any errors
  //     //   let module
  //     //   try {
  //     //     module = await import(
  //     //       `../generated/${item.name}/${item.versions.slice(-1)[0]}.tsx`
  //     //     )
  //     //     console.log('module', module)
  //     //     if (!module.default) return false
  //     //   } catch (e) {
  //     //     return false
  //     //   }
  //     //   return {
  //     //     name: item.name,
  //     //     title: item.title,
  //     //     versions: item.versions.length,
  //     //     last_version: item.versions.slice(-1)[0],
  //     //     component: module.default
  //     //   }
  //     // } catch (error) {
  //     //   // Handle the error (e.g., log it)
  //     //   console.error(
  //     //     `Failed to import component for ${item.name}: ${error.message}`
  //     //   )
  //     //   // Return a placeholder component or null
  //     //   return false
  //     // }
  //   // })

  //   // Promise.all(imports).then((components) => {
  //   //   setComponentImports(components.filter((e) => e))
  //   // })

  // }, [activeCompId])

  function renderComponentSafely(Component) {
    try {
      return <Component />;
    } catch (error) {
      // Handle the error gracefully, e.g., log it or show an error message
      console.error("Error rendering component:", error);
      return <div>Error rendering component</div>; // You can customize the error message here
    }
  }

  console.log(componentImports);
  return (
    <div className="generated-component-list-grid">
      {getChatInitMessage(userChatData).map((item, index) => (
        <div
          key={index}
          className="generated-component-list-item"
          onClick={() => {
            setActiveCompId(item._id);
            setActiveCompTitle(item.chatTitle);
          }}
        >
          <div className="generated-component-list-title">
            <p className="generated-component-list-title-bold">
              {/* {item._id}
              <br></br> */}
              {item.chatTitle}
              {/* {typeof item.lastMessage[0] === "string"
                ? item?.lastMessage[0]
                : JSON.stringify(item?.lastMessage[0])} */}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
