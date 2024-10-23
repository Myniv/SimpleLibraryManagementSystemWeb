const FooterFunction = () => {
  const name = "Mulyana";
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>{`Copyright © ${year}  ${name}. All Rights Reserved`}</p>
      <p>
        <a href="https://www.linkedin.com/in/mulyana-nurcahyani-45216b267/">@Mulyana N</a>
      </p>
    </footer>
  );
};

export {FooterFunction};
