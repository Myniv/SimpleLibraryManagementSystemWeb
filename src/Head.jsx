const HeaderFunction = () => {
  const currentDate = new Date().toDateString();
  return (
    <header>
      <title>Library Management</title>
      <h1>Library Management</h1>
      <p>{currentDate}</p>
    </header>
  );
};

export {HeaderFunction};
