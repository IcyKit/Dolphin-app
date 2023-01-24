import "./Feed.css";
import CreatePost from "../../components/CreatePost";
import Posts from "../../components/Posts";
import ProfileInfo from "../../components/ProfileInfo";
import Actual from "../../components/Actual";
import Bloggers from "../../components/Bloggers";
import Footer from "../../components/Footer";
import CreatePostParent from "../../components/CreatePostParent";
import { useState } from "react";

const Feed = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <main>
            <div className="container">
                <div className="main__box">
                    <section className="last-messages">
                        {isOpen ? (
                            <CreatePostParent />
                        ) : (
                            <CreatePost setIsOpen={setIsOpen} />
                        )}
                        <Posts />
                    </section>
                    <aside>
                        <ProfileInfo />
                        <Actual />
                        <Bloggers />
                    </aside>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Feed;
