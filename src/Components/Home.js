const Home = (props) => {

    const { name, age, address } = props;

    return (
        <div style={{color: 'white'}} >
            <h1>Hi {name}</h1>

            <h2>Age: {age} </h2>

            <h2>Address: {address} </h2>
        </div>
    )
}

export default Home;