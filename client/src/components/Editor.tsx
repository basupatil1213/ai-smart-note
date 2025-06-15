import EditorJS from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import { useEffect } from "react";

const Editor = () => {
    const editor = new EditorJS({
        holder: "editorjs",
        tools: {
            header: Header,
            linkTool: LinkTool,
        }
    });

    // useEffect(() => {
    //     editor.render({ blocks: [] });

    //     return () => {
    //         editor.destroy();
    //     }
    // }, []);

    const getText = () => {
        const text = editor.saver.save();
        console.log(JSON.stringify(text));
    }

    return (
        <div className="m-10 w-full h-full bg-red-500 ">
            <div id="editorjs" className="w-full h-full border-2 border-gray-300 rounded-md bg-black text-white"></div>
            <button onClick={getText}>Get Text</button>
        </div>
    )
}

export default Editor;