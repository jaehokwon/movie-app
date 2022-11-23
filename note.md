**Table of Contents**

- [React 기초 사용법](#react-기초-사용법)
- [JSX 문법](#jsx-문법)
- [State](#state)
  - [제어 컴포넌트(Controlled Component)](#제어-컴포넌트controlled-component)
  - [비제어 컴포넌트(Uncontrolled Component)](#비제어-컴포넌트uncontrolled-component)
- [Props](#props)
  - [PropTypes](#proptypes)

# React 기초 사용법
```html
<!-- !!react 사용 시 기본 필수 script 정의!! -->
<script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
<script>
    const root = document.getElementById("root");
    const h3 = React.createElement("h3", "title", {
        onMouseEnter: () => console.log("mouse enter"),
    });
    const btn = React.createElement("button", null, {
        onClick: () => console.log("im clicked"),
        style: { backgroundColor: "tomaot" },
    });
    const container = React.createElement("div", null, [h3, btn]);
    ReactDOM.render(container, root);
</script>
```

# JSX 문법
```html
<script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
<!-- babel -> jsx 문법을 react 문법으로 변환하여 html이 해석 할 수 있게 해줌.
     +@ script type="text/babel" 지정 또한 필수!! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
    const root = document.getElementById("root");
    // JSX(JavaScript XML) -> Javascript 확장 문법
    // Component는 대문자로 시작! 소문자로 시작할 경우 적용 시 html element로 인식
    function Title() {
        return (
            <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>
            Hello Im a title
        </h3>
        );
    }
    // function, arrow function 중 arrow function을 더 선호 함.
    const Button = () => (
        <button
        style={{ backgroundColor: "tomato" }}
        onClick={() => console.log("im clicked")}
        >
        Click me
        </button>
    );
    const Container = () => (
        <div>
        <Title />
        <Button />
        </div>
    );
    ReactDOM.render(<Container />, root);
</script>
```

# State
- 컴포넌트 안에서 관리하는 객체로 뷰에 렌더링 되어있는 컴포넌트 데이터를 제어/관리하는 데 사용한다.
- 일반 자바스크립트를 사용한 브라우저의 경우 노드정보가 바뀔때마다 노드트리를 처음부터 다시 생성하는 반면, 리액트는 가상돔(ReactDOM)을 사용하여 보이는 부분만 수정해서 보여주고 모든 업데이트가 끝나면 일괄로 합쳐서 실제 돔에 전달한다.(렌더트리 단계의 최적화) 해당 부분을 State를 활용하여 쉽게 처리할 수 있다.

```javascript
const root = document.getElementById("root");
let counter = 0;
const onClick = () => {
    counter = counter + 1;
    ReactDOM.render(<App />, root);
};
const App = () => (
    <div>
        <h3>Total clicks: {counter}</h3>
        <button onClick={onClick}>Click me</button>
    </div>
);
ReactDOM.render(<App />, root);
```
- 위와 같이 onClick 함수에서 counter 값을 변경 후 render 함수를 통해 re-rendering 해도 되지만, 아래와 같이 State를 활용하여 처리하는 것이 일반적(위, 아래 동일하게 동작) 

```javascript
const root = document.getElementById("root");
const App = () => {
    const [counter, setCounter] = React.useState(0);
    return (
    <div>
        <h3>Total clicks: {counter}</h3>
        <button onClick={() => setCounter(counter + 1)}>Click me</button>
    </div>
    );
};
ReactDOM.render(<App />, root);
```
- setCounter(counter + 1) 보다 setCounter(current => current + 1)과 같은 형태로 사용하는 것이 더 일반적임.
- state function의 첫번째 파라미터 = state variable

## 제어 컴포넌트(Controlled Component)
```javascript
const App = () => {
    const [minutes, setMinutes] = React.useState(0);
    const onChange = (event) => {
        setMinutes(event.target.value);
    };
    return (
        <div>
            <label htmlFor="minutes">Minutes</label>
            <input
                id="minutes"
                placeholder="Minutes"
                type="number"
                value={minutes}
                onChange={onChange}
            />
        </div>
    );
};
```
- jsx에서 input과 같은 컴포넌트 경우 기본적으로 value 값에 직접적으로 접근 할 수 없다. 하여 해당 부분을 state(제어)/ref(비제어)를 활용해 value 값에 접근 및 관리가 가능하다.
- 제어 컴포넌트의 경우 실시간으로 값을 제어하고 관리해야되는 경우에 사용한다.(onChange + state function)

## 비제어 컴포넌트(Uncontrolled Component)
```javascript
const App = () => {
    const minutes = React.useRef();
    const handleSubmit = () => {
        const value = minutes.current.value;
        alert(`Input minutes: ${value}`);
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="minutes">Minutes</label>
            <input
                id="minutes"
                placeholder="Minutes"
                type="number"
                ref={minutes}
            />
        </form>
    );
};
```
- ref를 통해 컴포넌트에 접근하는 형태로 vanilla js와 유사하다.(input 값 입력 후 button 클릭하여 form submit할 때 값을 가져옴)
- form submit 시 실행되는 함수 내에서 ref를 통해 값을 가져올 수 있다.
- 불필요한 re-rendering을 줄이고 submit 시에만 값이 필요한 경우에 사용한다.

# Props
- 데이터, 이벤트 핸들러를 상위 컴포넌트에서 하위 컴포넌트로 매개변수처럼 전달하는 데 사용한다.
```javascript
const Btn = ({ text, onClick }) => {
    return (
    <button
        style={{
        backgroundColor: "tomato",
        color: "white",
        padding: "10px 20px",
        borderRadius: 10,
        }}
        onClick={onClick}
    >
        {text}
    </button>
    );
};
const MemorizedBtn = React.memo(Btn);
const App = () => {
    const [value, setValue] = React.useState("Save Changes");
    const changeValue = () => setValue("Revert Changes");
    return (
    <div>
        <Btn text={value} onClick={changeValue} />
        <MemorizedBtn text="Continue" />
    </div>
    );
};
```
- 위와 같이 상위 컴포넌트(App-Custom Syntax)에서 하위 컴포넌트(Btn-props)로 데이터를 전달한다.
- 매개변수 props의 경우 정의된 Custom Syntax(text, onClick)를 명시하여 사용하는 것도 가능하다.
  - ex) (props) -> ({ text, onClick }) // 이와 같이 사용하게 될 경우 props.text -> text로 표현 가능하다.
  - Btn 컴포넌트 props 중 이벤트 함수명과 동일한 onClick을 넘기더라도 html element에 이벤트 체인을 연결해주지 않으면 이벤트가 발생하지 않는다.
- 추가적으로 수많은 컴포넌트 중 re-rendering이 필요없는(변경 가능성이 없는) 컴포넌트의 경우 memo 함수를 통해 re-rendering 대상에서 제외할 수 있다.(추후 개발 시 수많은 컴포넌트 re-rendering 문제로 속도저하가 발생할 수 있음.)

## PropTypes
- 컴포넌트 Props의 타입 및 필수여부 등을 지정하여 오류를 사전 방지한다.
- 앞서 PropTypes 사용을 위해 아래 스크립트 설치가 필요하다
  - `<script src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>`
```javascript
const Btn = ({ text, fontSize = 14 }) => {
    return (
    <button
        style={{
        backgroundColor: "tomato",
        color: "white",
        padding: "10px 20px",
        borderRadius: 10,
        fontSize,
        }}
    >
        {text}
    </button>
    );
};
// props의 타입/필수여부 등 지정
Btn.propTypes = {
    text: PropTypes.string.isRequired,
    fontSize: PropTypes.number,
};
const App = () => {
    return (
    <div>
        <Btn text="Save Changes" fontSize={18} />
        <Btn text="Continue" />
    </div>
    );
};
```
