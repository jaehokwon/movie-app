**Table of Contents**

- [React 기초 사용법](#react-기초-사용법)
- [JSX 문법](#jsx-문법)
- [State](#state)
  - [제어 컴포넌트(Controlled Component)](#제어-컴포넌트controlled-component)
  - [비제어 컴포넌트(Uncontrolled Component)](#비제어-컴포넌트uncontrolled-component)

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
            Hello I'm a title
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
- 데이터를 저장하는 공간?
    일반 자바스크립트를 사용한 브라우저의 경우 노드정보가 바뀔때마다 노드트리를 처음부터 다시 생성하는 반면, 리액트는 가상돔(ReactDOM)을 사용하여 보이는 부분만 수정해서 보여주고 모든 업데이트가 끝나면 일괄로 합쳐서 실제 돔에 전달한다.(렌더트리 단계의 최적화)

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
- 위와 같이 onClick arrow method에서 counter 값을 re-rendering 해도 되지만, 아래와 같이 state를 활용하여 처리하는 것이 일반적(동일하게 동작) 

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
- jsx에서 input과 같은 component의 경우 기본적으로 value 값에 직접적으로 접근 할 수 없다. 하여 해당 부분을 state/ref를 활용해 value 값에 접근 및 관리가 가능하다.
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
- ref를 통해 component에 접근하는 형태로 vanilla js와 유사.(input 값 입력 후 button 클릭하여 form submit할 때 값을 가져옴)
- form submit 시 실행되는 함수 내에서 ref를 통해 값을 가져올 수 있다.
- 불필요한 re-rendering을 줄이고 submit 시에만 값이 필요한 경우에 사용한다.

**!! prop / state의 차이 이해 필요 !!**
