const SHOP_DATA = [
    {
      title: 'Hats',
      items: [
        {
          id: 1,
          name: "Blue Brim",
          imageUrl: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80",
          price: 25
        },
        {
          id: 2,
          name: "Blue Beanie",
          imageUrl: "https://images.unsplash.com/photo-1516637787777-d175e2e95b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80",
          price: 18
        },
        {
          id: 3,
          name: "Brown Cowboy",
          imageUrl: "https://images.unsplash.com/photo-1646940931023-c3570f8e9693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80",
          price: 35
        },
        {
          id: 4,
          name: "Grey Brim",
          imageUrl: "https://images.unsplash.com/photo-1487543466684-3011b7bc32f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80",
          price: 25
        },
        {
          id: 5,
          name: "Green Beanie",
          imageUrl: "https://images.unsplash.com/photo-1557115837-0c4e58980d47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80",
          price: 18
        },
        {
          id: 6,
          name: "Palm Tree Cap",
          imageUrl: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80",
          price: 14
        },
        {
          id: 7,
          name: "Red Beanie",
          imageUrl: "https://images.unsplash.com/photo-1645129116250-3de9aad9f241?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80",
          price: 18
        },
        {
          id: 8,
          name: "Wolf Cap",
          imageUrl: "https://images.unsplash.com/photo-1527813972756-2890936000e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80",
          price: 14
        },
        {
          id: 9,
          name: "Blue Snapback",
          imageUrl: "https://images.unsplash.com/photo-1634748076712-4a4f5baf80c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80",
          price: 16
        }
      ]
    },
    {
      title: 'Sneakers',
      items: [
        {
          id: 10,
          name: 'Adidas NMD',
          imageUrl: 'https://images.unsplash.com/photo-1620794341491-76be6eeb6946?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 220,
        },
        {
          id: 11,
          name: 'Adidas Yeezy',
          imageUrl: 'https://images.unsplash.com/photo-1585232004423-244e0e6904e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 280,
        },
        {
          id: 12,
          name: 'Black Converse',
          imageUrl: 'https://images.unsplash.com/photo-1625622176700-e55445383b85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 110,
        },
        {
          id: 13,
          name: 'Nike White AirForce',
          imageUrl: 'https://images.unsplash.com/photo-1615028456268-02eb9815a776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 160,
        },
        {
          id: 14,
          name: 'Nike Red High Tops',
          imageUrl: 'https://images.unsplash.com/photo-1575889404845-d44a4a342787?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 160,
        },
        {
          id: 15,
          name: 'Nike Brown High Tops',
          imageUrl: 'https://images.unsplash.com/photo-1603356731507-e60823d4e4c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 160,
        },
        {
          id: 16,
          name: 'Air Jordan Limited',
          imageUrl: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 190,
        },
        {
          id: 17,
          name: 'Timberlands',
          imageUrl: 'https://images.unsplash.com/photo-1520518225010-711b4f0b1d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 200,
        },
      ],
    },
    {
      title: 'Jackets',
      items: [
        {
          id: 18,
          name: 'Black Jean Shearling',
          imageUrl: 'https://images.unsplash.com/photo-1613869810108-70f9fe0cdef5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 125,
        },
        {
          id: 19,
          name: 'Blue Jean Jacket',
          imageUrl: 'https://images.unsplash.com/photo-1516828474992-30ba120acb47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 90,
        },
        {
          id: 20,
          name: 'Grey Jean Jacket',
          imageUrl: 'https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 90,
        },
        {
          id: 21,
          name: 'Brown Shearling',
          imageUrl: 'https://images.unsplash.com/photo-1652956187995-f454dfd7c006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 165,
        },
        {
          id: 22,
          name: 'Tan Trench',
          imageUrl: 'https://images.unsplash.com/photo-1631492211464-5f8c9d0fdc39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 185,
        },
      ],
    },
    {
      title: 'Womens',
      items: [
        {
          id: 23,
          name: 'White Tanktop',
          imageUrl: 'https://images.unsplash.com/photo-1670086037031-db78d77ad8bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 25,
        },
        {
          id: 24,
          name: 'Floral Blouse',
          imageUrl: 'https://images.unsplash.com/photo-1652267389101-553eced76024?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 20,
        },
        {
          id: 25,
          name: 'Floral Dress',
          imageUrl: 'https://images.unsplash.com/photo-1517970640957-23d07d5ed08c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 80,
        },
        {
          id: 26,
          name: 'Red Dots Dress',
          imageUrl: 'https://images.unsplash.com/photo-1564062392647-8b25be7ded12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 80,
        },
        {
          id: 27,
          name: 'Striped Sweater',
          imageUrl: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 45,
        },
        {
          id: 28,
          name: 'Yellow Track Suit',
          imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 135,
        },
        {
          id: 29,
          name: 'White Blouse',
          imageUrl: 'https://images.unsplash.com/photo-1548778943-5bbeeb1ba6c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 20,
        },
      ],
    },
    {
      title: 'Mens',
      items: [
        {
          id: 30,
          name: 'Black Puffer Vest',
          imageUrl: 'https://images.unsplash.com/photo-1639926784590-ff2ef4757bf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 325,
        },
        {
          id: 31,
          name: 'Floral shirt',
          imageUrl: 'https://images.unsplash.com/photo-1517191297489-48c463380e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 20,
        },
        {
          id: 32,
          name: 'Blue Longsleeve',
          imageUrl: 'https://images.unsplash.com/photo-1488371934083-edb7857977df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 25,
        },
        {
          id: 33,
          name: 'Green T-shirt',
          imageUrl: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 25,
        },
        {
          id: 34,
          name: 'Jean Long Sleeve',
          imageUrl: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 40,
        },
        {
          id: 35,
          name: 'Burgundy T-shirt',
          imageUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=380&q=80',
          price: 25,
        },
      ],
    },
  ];

export default SHOP_DATA