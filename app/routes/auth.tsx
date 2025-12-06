import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  return [
    { title: "Resume | Login" },
    { name: "description", content: "Login to your account" },
  ];
};
const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const next = location.search.split("next=")[1];


  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate(next);
    }
  }, [auth?.isAuthenticated, next]);
  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center ">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2">
            <h1>Welcome</h1>
            <h2>login to continue your job journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="primary-button animate-pulse ">
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth?.isAuthenticated ? (
                  <button className="primary-button" onClick={auth.signOut}>
                    <p>logout</p>
                  </button>
                ) : (
                  <button className="primary-button" onClick={auth.signIn}>
                    <p>login</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
