import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import MobileUI from "../../../components/common/MobileUI";

const DiaryMobileReadView = (props) => {

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    };

    return (
        <>
            {
                <MobileUI
                    style={{
                        width: "400px",
                        minHeight: "800px"
                    }}
                    disclosure={props.diary.disclosure}
                    title={props.diary.title}
                    time={props.diary.date}
                    userId={props.diary.userId}
                    convertedContent={props.diary.content}
                    createMarkup={createMarkup}
                    likes={99}
                    comments={99}
                />
            }
        </>

    )
}
export default DiaryMobileReadView;