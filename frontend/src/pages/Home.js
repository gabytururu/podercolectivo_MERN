import QuejasAllList from '../components/QuejasAllList'

const Home = () => {

    return ( 
        <div className="containerWrap">
            <div className="backdropImg">
                ACA IRA LA IMAGEN FRONTAL               
            </div>
            <div className="data">
                <h2>¿Cuáles son los Sectores con más Quejas en México?</h2>
                <QuejasAllList />

                <h2>¿Cuáles son las Empresas con más Quejas en México?</h2>
                <QuejasAllList />
            </div>         
        </div>
     );
}
 
export default Home;