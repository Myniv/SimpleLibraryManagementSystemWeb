const HeaderFunction = () => {
  const currentDate = new Date().toDateString();
  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <title>Library Management</title>
          <h1 className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            Library Management
          </h1>
          <p className="text-end">{currentDate}</p>
        </div>
      </div>
    </header>
  );
};

export { HeaderFunction };
