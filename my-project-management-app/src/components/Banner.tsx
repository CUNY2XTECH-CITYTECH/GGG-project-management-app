export const Banner = () => {
  return (
    <div className="py-3 text-center bg-[linear-gradient(to_right,rgba(252,214,255,0.7),rgba(41,216,255,0.7),rgba(255,253,128,0.7),rgba(248,154,191,0.7),rgba(252,214,255,0.7))]">
      <div className="container">
        <p className="font-medium">
          <span className="hidden sm:inline">
            Introducing Your Ultimate Project Management Tool -{' '}
          </span>
          <a href="/signin" className="underline underline-offset-4">
            Get Started Now
          </a>
        </p>
      </div>
    </div>
  );
};
