
const FooterFunction = () => {
  const name = "Mulyana";
  const year = new Date().getFullYear();
  return (
    // <div class="d-flex flex-column min-vh-100">
    <footer className="p-3 bg-dark text-white mt-5 ">
      <div className="container">
        <p className="mb-1 text-center">{`Copyright © ${year}  ${name}. All Rights Reserved`}</p>
        <p className="mb-0 text-center">
          <a href="https://www.linkedin.com/in/mulyana-nurcahyani-45216b267/">
            Linkedin
          </a>
          &ensp;
          <a href="https://www.instagram.com/mulyanan_/">Instagram</a>
        </p>
      </div>
    </footer>
    // </  div>
  );
};

export { FooterFunction };
