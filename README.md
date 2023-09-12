# 원티드 프리온보딩 12th 2팀 4주차 개인 과제

※ 본 과제는 [원티드 프리온보딩 인턴십 8월](https://www.wanted.co.kr/events/pre_ob_fe_12)를 바탕으로 진행되었습니다.

## 🤝 프로그램 진행과정 및 목적

### ❓ 진행과정

    1. 매 주 멘토님 또는 참여 기업으로부터 과제를 부여받습니다.

    2. 모든 팀원은 각자 자신의 스타일로 코드를 작성합니다.

    3. 서로의 코드를 리뷰하는 과정을 거치며, 본인의 코드를 동료에게 이해하기 쉽게 설명하고, 타인의 코드를 이해하는 과정을 경험합니다.

    4. 기능별로 가장 효율적이라고 판단되는 코드를 Best Practice로 선정하여 최종 결과물에 반영합니다.

### 💡 목적

좋은 코드를 만들 위해 고민하고, 그 과정에서 팀으로 일하는 법에 익숙해집니다.

## 🧑🏻‍💻 프로젝트 정보

### 📌 프로젝트 주제

- 주어진 데이터를 기반으로 시계열 차트를 구현합니다. 차트는 복합 그래프 형태이며, 호버 시 툴팁, 필터링 기능을 포함해야합니다.

- 핵심 기능 : `데이터의 시각화`, `데이터 맵핑`, `호버 툴팁 기능`, `필터링 기능` 등

<br/>


### 🗓️ 진행 기간

23년 9월 10일 ~ 23년 9월 13일

<br/>


### 👀 미리보기 
![image](https://github.com/HWAHAEBANG/pre-onboarding-12th-4/assets/101491870/50de5f9e-8b03-4359-8da6-f5105c01eb3b)



### ▶️ 실행 방법

- 배포 링크: [https://pre-onboarding-12th-4.vercel.app](https://pre-onboarding-12th-4.vercel.app)
- 링크가 실행되지 않는 경우 아래 명령어를 차례대로 입력하여 실행해주세요.

```jsx
// 로컬 클라이언트 실행 방법

git clone https://github.com/HWAHAEBANG/pre-onboarding-12th-4.git
npm install
npm start
```

<br/>

## 💭 주요 기능 구현에서의 고민 과정
### 📌 'visx' 라이브러리를 선택 한 이유
이전에 개인 프로젝트를 통해서 데이터 시각화를 진행한 경험이 있습니다. 당시 사용했던 라이브러리는 'high chart'라는 라이브러리로, 완성도 높은 디자인과 편리한 사용성을 제공해 주었습니다. 
하지만, `편리하다는 것은 곧 자율성 떨어진다는 것`을 의미했고 실제로, 사용했던 차트에 최소 높이가 정해져있어 불가피하게 계획했던 레이아웃 디자인을 변경해야 하는 불편함을 겪기도 하였습니다.

때문에 이번 과제에서는 조금더 디테일한 설정이 가능한 라이브러리를 배워보기 위해 의도적으로 `저수준 라이브러리`를 선택하였습니다. 
최초 D3.js 도입을 고려하였으나, `D3.js와 React는 각각 독립적인 방식으로 DOM을 관리하기 때문에 두 라이브러리 간의 충돌이 발생할 수 있다`는 사실을 알게되었습니다. 이에 따라 `D3.js를 리액트에 환경에 맞게 최적화`하여, `돔 조작 과정에서 발생할 수 있는 충돌을 방지`하도록 도와주는 `visx 라이브러리`를 선택했습니다.

<br/>


### 📌 예시 그래프와 똑같은 디자인을 선택한 이유
과제의 요구사항에는 디자인의 경우 자율적으로 진행하도록 허용해주었지만, 저는 예시로 주어진 차트를 똑같이 만들어 보기로 하였습니다. 
위에서 언급했던 개인 프로젝트를 통해서, `그래프를 그리는 것은 쉽지만 똑같이 그리는 것은 상당히 까다로운 작업`이라는 것을 알고있었기 때문입니다.

`협업 과정에 있어 기획자 또는 디자이너가 제시한 차트 디자인을 정확히 만들어 내는 것 또한 프론트엔드 개발자의 덕목`이라고 생각하여, 과제에서 제시해주신 예시에 가장 근접한 형태로 디자인을 하였습니다.

디자인 뿐만아니라, `눈금 간격`, `그래프의 시작 지점`, `버튼의 위치와 형태`, `그래프의 색상` 등 세세한 부분까지 동일하게 구현하는 것에 중점을 두었습니다.

<br/>

### 📌 데이터 맵핑
과제에서 주어진 목 데이터는 아래와 같이 3중의 중첩 객체로 이루어져있습니다.
이 데이터를 그래프에 효율적으로 적용하기위해 `순회가 가능한 객체 배열로 맵핑`을 하여 데이터를 사용했습니다.

####  🔍 과제에서 주어진 목 데이터
```ts
{
  type: "Mock data",
  version: 1,
  response: {
    "2023-02-01 14:32:00": {
      id: "성북구",
      value_area: 46,
      value_bar: 13111,
    },
    "2023-02-01 14:32:05": {
      id: "강남구",
      value_area: 9,
      value_bar: 19143,
    },
    ...
    }
}
```
####  🔍 데이터 맵핑 로직
사용하게 되는 데이터는 respose 이후의 데이터 입니다. 이를 [ { }, { },{ }...{ } ] 형태의 배열로 바꿔주고 위해 각각의 데이터를 새로운 객체로 맵핑해주는 과정이 필요합니다.

먼저, 객체 내에 date라는 key를 만들고, 날짜 정보를 값으로 부여합니다.<br>
다음, 이후에 있는 나머지 데이터를 스프레드 연산자로 넣어주어, 날짜와 기타 데이터들이 같은 레벨에 존재하는 객체를 만들어 주었습니다.

```ts
    const mappedDatas = Object.entries(MOCK_DATA.response).map((item) => ({
    date: item[0], ...item[1],
  }));
```
####  🔍 맵핑이 완료된 데이터
순회가 가능하고, 불필요한 depth를 간소화한 데이터로 변경되었습니다.
```ts
[
    { date: "2023-02-01 14:32:00",
      id: "성북구",
      value_area: 46,
      value_bar: 13111,
    },
    { date: "2023-02-01 14:32:05",
      id: "강남구",
      value_area: 9,
      value_bar: 19143,
    },
    ...
]
```

<br/>

### 📌 호버 툴팁 기능
`id`, `vale_bar`, `vale_bar` 의 값을 모두 참조할 수 있는 툴팁을 수동으로 만들기 위해서는 어느 위치에서든(그래프가 없는 영역이라도) 해당 라인의 데이터를 다 참조 할 수 있어야합니다. 

하지만 `각각의 차트에 hover 이벤트를 설정한다면, Bar 차트를 hover 했을 때는 Area 차트의 값은 참조할 수 있는 문제점`이 존재합니다. 

따라서 이를 해결하기 위해 `화면을 가득 채우는 Bar 차트를 만들어 가장 앞 레이어 두고(z-index를 가장 높게), 이를 투명하게 만들어서 차트가 없는 영역을 hover하더라도 데이터들을 보여줄 수 있도록 구현`하였습니다.(`visx 공식문서에서 권고한 방안`)

####  🔍 가장 앞 단 레이어에 투명한 상태로 존재하는 Bar차트의 형태
![image](https://github.com/HWAHAEBANG/pre-onboarding-12th-4/assets/101491870/b3209905-0f3e-4124-9dc5-be564d806e4d)


####  🔍 결과적으로 보여지는 모습
![image](https://github.com/HWAHAEBANG/pre-onboarding-12th-4/assets/101491870/0e9c2517-7a23-430d-9cc5-58ea31eb7b46)


<br/>

### 📌 필터링 기능 (하이라이트)
클릭시 동일한 id를 가진 데이터들의 색상을 변경시켜주는 필터링 기능은 두가지의 이벤트에 대해 반응합니다.
1. 좌상단의 버튼 리스트를 클릭했을 때.
2. 차트 영역을 클릭했을 때.

선택된 id는 seleted라는 상태를 통해 관리되고 있으며, seleted 값의 변화에 따라 seleted와 데이터의 id값이 일치히는 경우 색상을 변경해주도록 구현하였습니다.

```tsx
        <Bar
          ...
          fill = {d.id === selected ? "#5741C0" : "#9EA1FF"}
          ...
        />
```

<br/>

### 📌 가장 신경 쓴 부분 : Area 차트의 시작 지점
Bar 차트와 Area 차트가 혼합되어 있는 `복합형 그래프이기 때문에 발생하는 고유의 문제`가 있었습니다.
Bar 차트는 한 칸당 bandWith 라는 너비를 가지는 반면, Area 차트 기본적으로 너비가 없어 `시작점에서 차이`로 인해 `그래프의 왜곡`이 일어나게 됩니다.

이를 자동적으로 인식해서 제공하는 `고수준 라이브러리`와는 다르게 `저수준 라이브러리`는 수동으로 반영하는 과정이 필요했습니다.

아래의 코드와 같이 Bar차트에 적용됐던 `bandwidth를 2로 나눈 값`을 x좌표 더하여 줌으로써 문제를 해결할 수 있었습니다.

```tsx
// 수정 전
        <AreaClosed<MappedDatas>
            data={mappedDatas}
            x={(d) => xScale(getXValue(d)) ?? 0} // 수정될 부분
            y={(d) => yScaleArea(getYValueArea(d)) ?? 0}
          />

// 수정 후
                  <AreaClosed<MappedDatas>
            data={mappedDatas}
            x={(d) => xScale.bandwidth() / 2 + xScale(getXValue(d)) ?? 0} // 수정된 부분
            y={(d) => yScaleArea(getYValueArea(d)) ?? 0}
          />
```

| 수정 전 | 수정 후                                    |
| ------------------------ | ------------------------ |
| ![image](https://github.com/HWAHAEBANG/pre-onboarding-12th-4/assets/101491870/3fb2474e-3fe8-4279-90c7-89d1145079a9)| ![image](https://github.com/HWAHAEBANG/pre-onboarding-12th-4/assets/101491870/d7e01eeb-c1a1-445e-9a93-5f38984b6e6a)|

<br/>

### 📂 프로젝트 구조
```markdown
📦 src
│  App.tsx
│  index.css
│  index.tsx
│  react-app-env.d.ts
├─📂 components
│      └─charts
│          CategoryBtnList.tsx
│          CombinationChart.tsx
│          Legend.tsx
├─📂constants
│      category.ts
├─📂data
│      mock_data.ts
└─📂types
        mappedDatas.ts
```
<br/>

### 🖇️ 사용 라이브러리 및 기술

```jsx
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/d3": "^7.4.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.50",
    "@types/react": "^18.2.21",
    "@types/react-dom": "^18.2.7",
    "@visx/axis": "^3.3.0",
    "@visx/curve": "^3.3.0",
    "@visx/event": "^3.3.0",
    "@visx/group": "^3.3.0",
    "@visx/legend": "^3.3.0",
    "@visx/scale": "^3.3.0",
    "@visx/shape": "^3.3.0",
    "@visx/tooltip": "^3.3.0",
    "@visx/visx": "^3.3.0",
    "d3-time-format": "^4.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "react-use-measure": "^2.1.1",
    "styled-components": "^6.0.7",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "prettier": "^3.0.3"
  }
```

<br/>

## 🫱🏻‍🫲🏿 Commit Convention

| 태그      | 설명                                    |
| --------- | -------------------------------------------------------------- |
| feat:     | 새로운 기능 추가 (변수명 변경 포함)                            |
| fix:      | 버그 해결                                                      |
| design:   | CSS 등 사용자 UI 디자인 변경                                   |
| style:    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우          |
| refator: | 프로덕션 코드 리팩토링                                         |
| comment:  | 필요한 주석 추가 및 변경                                       |
| docs:     | 문서를 수정한 경우                                             |
| chore:    | 빌드 테스크 업데이트, 패키지 매니저 설정(프로덕션 코드 변경 X) |


