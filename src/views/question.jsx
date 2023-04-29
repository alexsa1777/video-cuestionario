import { useNavigate, useParams } from 'react-router-dom';
import { questions, options } from '../data/questions';
import { useState, useRef, useEffect } from "react";
import Webcam from 'react-webcam';
import RecordRTC from 'recordrtc';
import Btnstop from '../images/btn-stop.png';
import Btnicon from '../images/btn-icon.png';
import Btnagain from '../images/btn-again.png';
import ActiveImg from '../images/active.gif';

const Question = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const quiz = questions.find((question) => question.id === parseInt(id));
    const incompleted = questions.filter((question) => question.isCompleted === false)
    const [videoUrl, setVideoUrl] = useState(quiz.url);
    const [showVideo, setShowVideo] = useState(quiz.isCompleted);
    const [stopVideo, setStopVideo] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [counter, setCounter] = useState(120000);
    const[startCounter, setStartCounter] = useState(false);
    const minutes = Math.floor(counter / 60000);
    const seconds = ((counter % 60000) / 1000).toFixed(0);

    useEffect(() => {
        if(startCounter){
            const timer = setTimeout(() => {
                if (counter > 0) {
                  setCounter(counter - 1000);
                } else {
                  stopRecording();
                }
              }, 1000);
          
              return () => clearTimeout(timer);
        }
      }, [counter, startCounter]);

    useEffect(() => {
        if (recorder) {
            recorder.startRecording();
        }
    }, [recorder]);

    useEffect(() => {
        setVideoUrl(quiz.url);
        setShowVideo(quiz.isCompleted);
        setCounter(120000);
    }, [id]);

    const startRecording = () => {
        setStopVideo(true);
        const stream = document.getElementById("myWebcam").srcObject;
        setRecorder(RecordRTC(stream, options));
        setStartCounter(true);
        
    }

    const stopRecording = () => {
        console.log('aqui estoy');
        recorder.stopRecording(() => {
            const blob = recorder.getBlob();
            const url = URL.createObjectURL(blob);
            setStopVideo(false);
            setVideoUrl(url);
            setShowVideo(true);
            console.log(url);
        });
        console.log('aqui estoy tambien');
        setStartCounter(false);
    }

    const againRecording = () => {
        setShowVideo(false);
        setCounter(120000);
    }

    const nextBtn = () => {
        if (incompleted.length === 0) {
            if (questions.length >= quiz.id + 1) {
                navigate(`/question/${quiz.id + 1}`);
            }
        } else {
            if (incompleted.length === 1) {
                if (quiz.isCompleted === false) {
                    quiz.url = videoUrl;
                    quiz.isCompleted = true;
                    navigate('/');
                }
            } else {
                let index = questions.findIndex((item) => item.id === quiz.id);
                while (index < (questions.length - 1)) {
                    index++;
                    if (questions[index].isCompleted === false) {
                        quiz.url = videoUrl;
                        quiz.isCompleted = true;
                        navigate(`/question/${questions[index].id}`);
                        return;
                    }
                }
            }
        }
    }

    const backBtn = () => {
        if (incompleted.length === 0) {
            console.log('aqui aqui', quiz.id);
            if (quiz.id - 1 >= 1) {
                navigate(`/question/${quiz.id - 1}`);
            }
        } else {
            let index = questions.findIndex((item) => item.id === quiz.id);
            while (index > 0) {
                index--;
                if (questions[index].isCompleted === false) {
                    quiz.url = videoUrl;
                    quiz.isCompleted = true;
                    navigate(`/question/${questions[index].id}`);
                    return;
                }
            }
        }
    }

    return (
        <div className='quiz-card-div'>
            <button className='btn-back' onClick={() => {
                navigate('/')
            }}>
                Volver
            </button>

            <div className='card-video'>
                <div className={stopVideo?'container-recording': 'element-hidden'}>
                    <label>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</label>
                    <img src={ActiveImg} className='active-img'></img>
                </div>
                <div className={showVideo ? 'element-hidden' : 'video-btn-content'}>
                    <Webcam id="myWebcam" className='video-recording' video={true} audio={true} />
                    <button onClick={startRecording} className={stopVideo ? 'element-hidden' : 'btn-float'}>
                        <img src={Btnicon} className='image-btn'></img>
                    </button>
                    <button onClick={stopRecording} className={stopVideo ? 'btn-float' : 'element-hidden'}>
                        <img src={Btnstop} className='image-btn'></img>
                    </button>
                </div>
                <div className={showVideo ? 'video-btn-content' : 'element-hidden'}>
                    <video controls src={videoUrl} />
                    <button onClick={againRecording} className='btn-float'>
                        <img src={Btnagain} className='image-btn'></img>
                    </button>
                </div>

                <div className='questioin-text'>
                    <label className='text-label'>
                        {quiz.textQuestion}
                    </label>
                </div>
            </div>

            {incompleted.length === 0 && (
                <div className='container-btns'>
                    <button className={quiz.id === questions[0].id ? 'btn-hidden' : 'navigators-btn'}
                        onClick={backBtn}>
                        Atras
                    </button>
                    <button className={quiz.id === questions[questions.length - 1].id ? 'btn-hidden' : 'navigators-btn'}
                        onClick={nextBtn}>
                        Siguiente
                    </button>
                </div>
            )}

            {incompleted.length !== 0 && (
                <div className='container-btns'>
                    <button className={incompleted.length === 1 || quiz === incompleted[0] ? 'btn-hidden' : 'navigators-btn'}
                        onClick={backBtn}>
                        Atras
                    </button>
                    <button className={quiz === incompleted[incompleted.length - 1] && incompleted.length !== 1 ? 'btn-hidden' : 'navigators-btn'}
                        onClick={nextBtn}>
                        {incompleted.length === 1 ? 'Terminar' : 'Siguiente'}
                    </button>
                </div>
            )}

        </div>
    )
}
export default Question