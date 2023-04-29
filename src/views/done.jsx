import imgDone from '../images/done.jpg';
const Done = ()  =>{
return(
    <div className='done-container'>
        <h1>Proceso terminado!</h1>
    <img src={imgDone} className='done-img'></img>
    <p>Revisar la consola</p>
    </div>
)
}
export default Done