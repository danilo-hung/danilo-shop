import Directory from '../../components/directory/directory.component';


const Home = () => {
  const cats = [
    {
      id: 1,
      title: "Hats",
      imgUrl: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=1000"
    },
    {
      id: 2,
      title: "Jackets",
      imgUrl: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=1000"

    },
    {
      id: 3,
      title: "Sneakers",
      imgUrl: "https://images.unsplash.com/photo-1618677831708-0e7fda3148b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=1000"
    },
    {
      id: 4,
      title: "Womens",
      imgUrl: "https://images.unsplash.com/photo-1564463836146-4e30522c2984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=1000"
    },
    {
      id: 5,
      title: "Mens",
      imgUrl: "https://images.unsplash.com/photo-1530882548122-0596ee66cdfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=1000"
    },
  ]


  return (
    <Directory prop={cats} />

  );
}

export default Home;
