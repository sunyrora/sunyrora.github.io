---
layout: post
title: iOS 10에서 flex colum 레이아웃 깨짐 현상 
description: iOS 10에서 flex layout direction이 colum일 때 height 값 제대로 계산 못하는 현상
date: 2018-04-05 22:40:40 +0200
img: 
tags: [iOS flex, iPhone flex, flex column]
category: [Tech]
author: sunyrora
---

처음 빌드 후 깃허브에 업로드를 하고, 나의 아이폰에서 글을 확인해보니 레이아웃이 엉망으로 출력이 되고 있었다.  

{% assign img_url = "/ios_flex_layout.png" | prepend: site.image_url %}

[![ios_layout_break]({{ img_url }}){: width="300px" : title="click to view"}]({{ img_url }})
{: .center}

위 이미지의 빨간 테두리에 보이는 것처럼, 화면 맨 아래에 위치해야할 디스커스가 맨 위에서 짤려있고, 화면 오른쪽 아래에 위치해야할 화살표 역시 위에 위치해 있다.  
이전/다음 포스트 버튼은 글 어딘가 중간쯤에 있었다.  

뭔가 모바일용에서 정상 작동하지 않는 코드가 있나 햇는데, 안드로이드 폰에서는 정상으로 출력된다.
구형 브라우저 및 최신 브라우저에서 모두.  
아이폰에서는 사파리만 사용하고 있었는데, 브라우저 문제인가 확인해보기 위해 아이폰용 크롬, 파이어폭스, 오페라에서 확인해 보니 모두 같은 현상이다. 

이번엔 아이맥의 시뮬레이터에서도 실행을 해보니 정상 작동한다.  
내 아이폰은 6s, iOS 10.3.3 이고, 시뮬의 iOS 버전은 11.2 이다.
이 쯤 되면 iOS의 문제인 것 같긴한데, 뭣이 문제인지 알 수가 없었다.  
검색을 해봐도 명확한 답변을 찾을 수 없었는데, 레이아웃을 이리저리 변경하고 테스트를 던 중  
'height: 100%' 값을 삭제했더니 제대로 출력이 된다.
😲 ?

이번엔 검색어를 더 구체화해서 찾아보니 아래와 같은 글을 발견했다.

[Flexbox Relative Height Issue in iOS 10](http://www.damirscorner.com/blog/posts/20180209-FlexboxRelativeHeightIssueInIos10.html)

결론은 역시 iOS 10에서의 이슈였으며 iOS 11에서는 수정되었다고 한다.
이슈가 됐던 부분은, flex-direction이 column 일때, 부모 엘리먼트의 높이를 설정하지 않고 자식에서 높이를 % 로 지정하면 높이를 제대로 계산하지 못하는 문제이다.

하지만 저 글에서는 부모 position을 absolute로하고, 자식은 relative로 해야한다고 했지만,
난 단지 자식의 height을 삭제하는 것만으로도 해결이 됐다.


### 재현
간단한 코드로 문제를 재현해보자면 아래와 같다.

```html
<div class="container">
  container
  <div class="inner-container">
    inner-container
    <div class="child-a">
      child-a
    </div>
    <div class="child-b">
      child-b
    </div>
  </div>
</div>
```

그리고 inner-container의 height을 100% 로 설정한다.

```css
.container {
      display: flex;
      flex-direction: column;
      background-color: navajowhite;
      width: 100%;
    }

    .inner-container {
      display: flex;
      flex-direction: column;
      background-color: mediumslateblue;
      width: 100%;
      height: 100%;
      margin: 5px;
    }

    .child-a {
      width: 100%;
      background-color: mediumseagreen;
    }

    .child-b {
      width: 100%;
      background-color: pink;
    }

    .child-a,
    .child-b {
      margin: 10px;
    }
  ```


위 코드를 iOS 10.3.3 에서 실행하면 아래와 같은 모양으로 출력이된다.

{% assign img_url = "/ios_flex_with_height_percent.png" | prepend: site.image_url %}
[![ios_flex_height_percent]({{ img_url }}){: width="300px" : title="click to view"}]({{ img_url }})
{: .center}

inner-container가 제대로 출력되지 않는 것을 볼 수 있다.  
여기서 inner-container의 height을 삭제하고 실행을 하면 아래와 같이 원하는 결과를 얻을 수 있다.

{% assign img_url = "/ios_flex_without_height.png" | prepend: site.image_url %}
[![ios_flex_without_height]({{ img_url }}){: width="300px" : title="click to view"}]({{ img_url }})
{: .center}

inner-container의 높이가 자식의 높이만큼 자동으로 잘 적용이 되었다.

### 결론은

iOS 10(내 폰 10.3.3 에서만 테스트) 에서 flex-direction: column 을 사용할 시,

1. 부모 엘리먼트의 높이를 설정한 경우
  - 자식 엘리먼트의 높이에 %, 또는 px 모두 사용할 수 있음

2. 부모 엘리먼트의 높이를 설정하지 않았다면
  - 자식 엘리먼트의 높이에 %를 사용할 수 없음