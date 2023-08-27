import { useState, useEffect } from 'react';
import styles from './ChatAnswer.module.css';
import like from '../img/chatbot_like.png';
import like_hover from '../img/chatbot_like_filled.png';
import unlike from '../img/chatbot_unlike.png';
import unlike_hover from '../img/chatbot_unlike_filled.png';
import referenceIcon from '../img/reference.png';
import dots from '../img/dots.png';
import haho from '../img/3d_haho.png';
import closeBtn from '../img/close_btn.png';
import LikeModal from './LikeModal';
import UnlikeModal from './UnlikeModal';
import axios from 'axios';

const ChatAnswer = (props) => {
    const { content, reference, blockIconZip } = props;
    const [likeHovered, setLikeHovered] = useState(false);
    const [unlikeHovered, setUnlikeHovered] = useState(false);
    const [referenceOpen, setReferenceOpen] = useState(false);
    const [likeModalOpen, setLikeModalOpen] = useState(false);
    const [unlikeModalOpen, setUnlikeModalOpen] = useState(false);

    const handleLikeMouseOver = () => {
        setLikeHovered(true);
    };

    const handleLikeMouseLeave = () => {
        setLikeHovered(false);
    };

    const handleUnlikeMouseOver = () => {
        setUnlikeHovered(true);
    };

    const handleUnlikeMouseLeave = () => {
        setUnlikeHovered(false);
    };

    const handleReferenceOpen = () => {
        if (referenceOpen) {
            setReferenceOpen(false);
        } else {
            setReferenceOpen(true);
        }
    };

    const handleReferenceClose = () => {
        setReferenceOpen(false);
    };

    const handleLikeClick = () => {
        if (likeModalOpen) {
            setLikeModalOpen(false);
            console.log("like clicked");
        } else {
        setLikeModalOpen(true);
        console.log("like clicked");
    }
}

    const handleUnlikeClick = () => {
        if (unlikeModalOpen) {
            setUnlikeModalOpen(false);
            console.log("like clicked");
        } else {
        setUnlikeModalOpen(true);
        console.log("unlike clicked");
    }
}

    const sendLikeFeedback = () => {
        axios.post('https://asku.wiki/ai/chatbot/feedback/', {
            qna_id: 1,
            feedback: true,
    }).
    then(response => {
        console.log(response);
    }).
    catch(error => {
        console.error(error);
    });
}

    const sendUnlikeFeedback = () => {
        axios.post('https://asku.wiki/ai/chatbot/feedback/', {
            qna_id: 1,
            feedback: false,
    }).
    then(response => {
        console.log(response);
    }).
    catch(error => {
        console.error(error);
    });
}

    return (
        <div>
            <div className={styles.answerBox}>
                <div className={styles.characterContainer}>
                    <img src={haho} alt="character" className={styles.character} />
                </div>
                <div className={styles.chatTextWrap}>
                    <p className={styles.chatText}>{content}</p>
                </div>
                <img src={dots} className={styles.dots} />
                <div className={styles.iconZip} style={{ visibility: blockIconZip ? 'hidden' : 'inherit' }}>
                    <img
                        id={styles.like}
                        className={styles.icon}
                        src={likeHovered ? like_hover : like}
                        alt="like"
                        onMouseOver={handleLikeMouseOver}
                        onMouseLeave={handleLikeMouseLeave}
                        // onClick={() => {
                        //     handleLikeClick();
                        //     sendLikeFeedback();
                        // }}
                        onClick={handleLikeClick}
                    />
                    <img
                        id={styles.unlike}
                        className={styles.icon}
                        src={unlikeHovered ? unlike_hover : unlike}
                        alt="unlike"
                        onMouseOver={handleUnlikeMouseOver}
                        onMouseLeave={handleUnlikeMouseLeave}
                        // onClick={() => {
                        //     handleUnlikeClick();
                        //     sendUnlikeFeedback();
                        // }}
                        onClick={handleUnlikeClick}
                    />
                    <img
                        id={styles.referenceIcon}
                        className={styles.icon}
                        src={referenceIcon}
                        alt="reference link"
                        onClick={handleReferenceOpen}
                    />
                </div>
                <div style={{ display: referenceOpen ? 'block' : 'none' }} className={styles.reference_wrap}>
                <div className={styles.reference}>
                    <div className={styles.header}>
                        <p className={styles.title}>출처</p>
                        <img className={styles.closeBtn} src={closeBtn} alt="close button" onClick={handleReferenceClose}/> 
                    </div>
                    <div className={styles.reference_text}>
                        <p>{reference}</p>
                    </div>
                </div>
                </div>
            </div>
            
            {likeModalOpen && <LikeModal isOpen={likeModalOpen} onClose={() => setLikeModalOpen(false)} />}
            {unlikeModalOpen && <UnlikeModal isOpen={unlikeModalOpen} onClose={() => setUnlikeModalOpen(false)} />}
        </div>
    );
};

export default ChatAnswer;