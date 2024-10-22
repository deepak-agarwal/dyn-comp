import React, { useEffect, useState } from "react";
import GeneratedComponentsList from "../components/generatedComponentList";
import CompChat from "./compChat";
import "../globals.css";
import { getActiveCompId } from "../utils/ls";

function Chat() {
  const [activeCompId, setActiveCompId] = useState();
  const [activeComponentTitle, setActiveComponentTitle] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newCompState, setNewCompState] = useState(false);
  const [chatData, setChatData] = useState([]);

  const handleNewChat = () => {
    setNewCompState(true);
    setActiveCompIdLS(undefined);
  };
  // useEffect(() => {
  //   async function load_allChats(componentId: string) {
  //     // setNewComponent(false);
  //     // console.log("error here??");

  //     // const generatedComponents = await import(
  //     //   `../components/generated/${componentId}/metadata.json`
  //     // );
  //     // console.log(generatedComponents);
  //     // Load child components dynamically based on the JSON data
  //     // const imports = generatedComponents.iterations.map(async (item: any) => {
  //     //   // Construct the import path for each child component
  //     //   const importPath = `../components/generated/${componentId}/${item.version}.tsx`;

  //     //   console.log(importPath);
  //     //   try {
  //     //     // Use dynamic import to load the component, and catch any errors
  //     //     console.log("importPath", item);
  //     //     const module = await import(
  //     //       `../components/generated/${componentId}/${item.version}.tsx`
  //     //     );
  //     //     console.log("item", item);
  //     //     return {
  //     //       prompt: item.prompt,
  //     //       version: item.version,
  //     //       timestamp: item.timestamp,
  //     //       code: item.code,
  //     //       component: module.default,
  //     //     };
  //     //   } catch (error) {
  //     //     console.error(
  //     //       `Failed to import component for ${item.name}: ${error.message}`
  //     //     );
  //     //     // Return a placeholder component or null
  //     //     return false;
  //     //   }
  //     // });

  //     // Promise.all(imports).then((components) => {
  //     //   setGeneratedVersions(components.filter((e) => e));
  //     //   console.log(components);
  //     fetch(`http://localhost:3001/getchats`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjU2MWNlOWJiNGRlMDM1M2NhNjM1NWY1ZGNiOWQ1MTZhZmJhZTdiMjBkODgyMmYyZTVhMzdmMDE1MjYzZWIwYjAxYzVjNzQ0YzA5YWExNTgiLCJpYXQiOjE3MDA2MzQwOTQuODcwOTkxLCJuYmYiOjE3MDA2MzQwOTQuODcwOTkyLCJleHAiOjE3MzIyNTY0OTQuODUwNjkxLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.xbBxSHFJQESO36tqY9JqQOFTW1fiTpgXgEUnbcScooCDSBmMTJxjvpDWQ7IVYDhGNVNkwOg_27oaWtUX2UIUe7JGORtL6yMoE5Aa21DwZHhDNNBaR4VBwjvs7CMv1rg4hRbA9U-PWZZycXUbKois-8bAOr7fbuaOFCoYYrlsciS4T2W0JzmqSyZXgDZSQ07hsroz_DLrI_SJLQL_f3AXGpf2YUCjyPnUw_m4XKniDMNnlX-tdtX70xNdTOOSms6HdPJeTTfXlpCJ5m8f5t1wLBoMH-PFWj7eMf-GjX3dqC6oCQNLdoO12jc3j7cX3TKVoTv9yiLbrLQMSX9v9rSDA3Yl-5jExgiCNwZeoXrw-3xk2WH7244qtesClSfThd-C-vKOph2rGujRt9o1cXBHxN0E1SxVG4q3Ys6WaV55jXvCEWbIqbOB-VVgkELl1LQOyTN3YvtSzUVy9u16QQ0AwHAssMu9RTBtxDMYg_X5HoRVMXUCKbL0F7NyCTQQEE4m-tM2C_Vw-M4Xp0wcpdP0NF_PdMiOfcUEGaXXMEwDm86yL7z7wLOCnCeDCnfdJM4NBKCiQuz6gVpbUeQ6LD2xuLcSIT8SkTrfVrZQtzI1hxrKDpE0z-fSZ-B4DcN75dqirTL0212gEk5MnzD7rE94Rb4dgJ8ldENL7Drl-NtTPxg`,
  //       },
  //       body: JSON.stringify({ componentId }),
  //     }).then((res) => {
  //       res.json().then((data) => {
  //         console.log(data);
  //         setGeneratedVersions(data);
  //       });
  //     });
  //     // });
  //   }

  //   if (componentId)
  //     setTimeout(() => {
  //       load_allChats(componentId);
  //     }, 1000);
  //   // else setNewComponent(true);
  //   // Wait for all dynamic imports to complete
  // }, [componentId]);

  useEffect(() => {
    const idInLs = getActiveCompId;
    setActiveCompId(idInLs);
    async function load_allChats() {
      fetch(`http://localhost:3001/getchats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjU2MWNlOWJiNGRlMDM1M2NhNjM1NWY1ZGNiOWQ1MTZhZmJhZTdiMjBkODgyMmYyZTVhMzdmMDE1MjYzZWIwYjAxYzVjNzQ0YzA5YWExNTgiLCJpYXQiOjE3MDA2MzQwOTQuODcwOTkxLCJuYmYiOjE3MDA2MzQwOTQuODcwOTkyLCJleHAiOjE3MzIyNTY0OTQuODUwNjkxLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.xbBxSHFJQESO36tqY9JqQOFTW1fiTpgXgEUnbcScooCDSBmMTJxjvpDWQ7IVYDhGNVNkwOg_27oaWtUX2UIUe7JGORtL6yMoE5Aa21DwZHhDNNBaR4VBwjvs7CMv1rg4hRbA9U-PWZZycXUbKois-8bAOr7fbuaOFCoYYrlsciS4T2W0JzmqSyZXgDZSQ07hsroz_DLrI_SJLQL_f3AXGpf2YUCjyPnUw_m4XKniDMNnlX-tdtX70xNdTOOSms6HdPJeTTfXlpCJ5m8f5t1wLBoMH-PFWj7eMf-GjX3dqC6oCQNLdoO12jc3j7cX3TKVoTv9yiLbrLQMSX9v9rSDA3Yl-5jExgiCNwZeoXrw-3xk2WH7244qtesClSfThd-C-vKOph2rGujRt9o1cXBHxN0E1SxVG4q3Ys6WaV55jXvCEWbIqbOB-VVgkELl1LQOyTN3YvtSzUVy9u16QQ0AwHAssMu9RTBtxDMYg_X5HoRVMXUCKbL0F7NyCTQQEE4m-tM2C_Vw-M4Xp0wcpdP0NF_PdMiOfcUEGaXXMEwDm86yL7z7wLOCnCeDCnfdJM4NBKCiQuz6gVpbUeQ6LD2xuLcSIT8SkTrfVrZQtzI1hxrKDpE0z-fSZ-B4DcN75dqirTL0212gEk5MnzD7rE94Rb4dgJ8ldENL7Drl-NtTPxg`,
        },
        body: JSON.stringify({ componentId: undefined }),
      }).then((res) => {
        res.json().then((data) => {
          setChatData(data);
        });
      });
    }
    load_allChats();
    return () => {
      setActiveCompIdLS(undefined);
    };
  }, []);

  const setActiveCompIdLS = (id) => {
    localStorage.setItem("activeCompId", id);
    setActiveCompId(id);
  };

  return (
    <div className="chat-app">
      <div className="contact-sidebar">
        <button className="new-chat" onClick={handleNewChat}>
          New Chat
        </button>
        <div className="generated-comp">
          <GeneratedComponentsList
            setActiveCompId={setActiveCompIdLS}
            activeCompId={activeCompId}
            userChatData={chatData}
            setActiveCompTitle={setActiveComponentTitle}
          />
        </div>
      </div>
      <div className="chat-container">
        <CompChat
          componentInitTitle={activeComponentTitle}
          isnewCompActive={newCompState}
          componentId={activeCompId}
          setActiveCompId={setActiveCompIdLS}
          chatData={chatData}
        />
      </div>
    </div>
  );
}

export default Chat;
