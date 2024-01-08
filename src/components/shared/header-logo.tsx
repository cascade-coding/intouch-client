 
const HeaderLogo = () => {
  return (
    <>
      <div className="hidden dark:block">
        <img
          src="/logo-dark.svg"
          width={100}
          height={28}
          alt="intouch-logo"
          className="h-auto sm:h-[36px] w-full"
        />
      </div>
      <div className="block dark:hidden">
        <img
          src="/logo-light.svg"
          width={100}
          height={28}
          alt="intouch-logo"
          className="h-[36px]"
        />
      </div>
    </>
  );
};

export default HeaderLogo;
