import Directory from './components/directory/directory.component';


const App = () => {
  const cats = [
    {
      id: 1,
      title: "Hats",
      imgUrl: "https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
    },
    {
      id: 2,
      title: "Jackets",
      imgUrl: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"

    },
    {
      id: 3,
      title: "Sneakers",
      imgUrl: "https://images.unsplash.com/photo-1618677831708-0e7fda3148b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
    },
    {
      id: 4,
      title: "Womens",
      imgUrl: "https://images.unsplash.com/photo-1581404917879-53e19259fdda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
    },
    {
      id: 5,
      title: "Mens",
      imgUrl: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
    },
  ]


  return (
    <Directory prop={cats} />

  );
}

export default App;
