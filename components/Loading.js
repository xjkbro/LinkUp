import { Circle } from "better-react-spinkit";
function Loading() {
    return (
        <center
            style={{ display: "grid", placeItems: "center", height: "100vh" }}
        >
            <div>
                <img
                    src="./LinkUP.png"
                    alt=""
                    style={{ marginBottom: 10 }}
                    height={200}
                />
                <Circle color="#03989e" size={60} />
            </div>
        </center>
    );
}

export default Loading;
