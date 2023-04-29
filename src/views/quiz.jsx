import { questions } from '../data/questions';
import Btnicon from '../images/btn-icon.png';
import { useNavigate } from 'react-router-dom'

const Quiz = () => {
  const navigate = useNavigate();
  const completed = questions.filter((question) => question.isCompleted === false);
  const showData = () =>{
    console.log('Datos enviados al back');
    console.log(questions);
    navigate('/done');
  }

  return (
    <div className='title'>
      <h1>Video Cuestionario</h1>
      <div className='conteiner'>
        {questions.map((quiz, index) => (
          <div className='card-question'>
            <button className='record-btn' onClick={() => {
              navigate(`/question/${quiz.id}`)
            }}>
              <img src={Btnicon} className='play-icon'></img>
            </button>
            <div className='questioin-text'>
              <label className='text-label'>
                {quiz.textQuestion}
              </label>
            </div>
          </div>
        ))}
      </div>

      {completed.length === 0 && (
        <div className='button-div'>
          <button className='finish-quiz' onClick={showData}>Envíar questionario</button>
        </div>
      )}
    </div>
  )
}
export default Quiz