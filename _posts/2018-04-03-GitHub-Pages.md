---
layout: post
title: "GitHub Pages 로 블로그를 시작해볼까?"
description:
date: 2018-04-03 12:05:43
img:
tags: [github pages, jekyll, plugin, blog]
category: [Blog, Tech]
author: sunyrora
---

문득 공부하던 것을 블로그로 정리해 놓으면 좋겠다는 생각이 들었다.  
여러가지 공부한 것을 그대로 지나가 버리면 시간이 지나면 금방 잊어버리기도 하고, 나중에 찾아보면 좋을 것 같아서 시작해 보았다.

여러가지 서비스들이 있는데, GitHub Pages 로 선택했다.  
다른 것들을 써보고 선택한게 아니라 비교는 못하겠지만, 깃허브를 선택하게 된 요인은.. 

* **Git으로 코드 관리를 함과 동시에 커밋(푸시)하면 자동으로 페이지가 생성.**  
    -> 결과적으로 이건 플러그인 때문에 조금 불편해졌다.

* **내가 원하는 기능을 내 맘대로 추가할 수 있다.**  
    -> 이건 배보다 배꼽이 더 커지는 결과를 초래했다.. 😭  
    글을 올리려고 시작했는데, 사이트 만드는데 너무 많은 시간을 투자해 버렸다.  

    시작하기 전 나의 지식:
     - 지킬 지식 전무
     - 루비 지식 전무
     - 리퀴드도 역시
    
    난 이걸 왜 시작한 것인가...... 


사실 처음 생각은 '맘에드는 테마를 가져와서 조금만 손보면 금방 하겠지' 였다.  
실제로도 그냥 테마만 가져다 쓰면 뭐 뚝딱이긴 하다. 깃허브에서 기본 제공하는 테마도 있고.  
ㅎㅎㅎ 그러나 욕심은 끝도 없어져서 결국 처음 마음 속으로 정해 놓았던 시간을 초과하고도 아직도 손 봐야할 것이 남아 있다.  
하지만 그렇게 되면 정말 이걸 하는 목적이 글을 정리하려는 것인지 블로그를 만드는 것 자체인지 모르게 되어 버릴 것 같아 우선 이쯤해서 깃 허브에 올리고 차차 조금씩 수정해 가기로 했다.  
(그런데 올리면서도 생각지 못한 문제들이 발생하여 또 시간을 잡아 먹었지..)


처음 시작은 기본인
[지킬 공식 홈][jekyll-home]과
[GitHub Pages 문서][github-pages]를 시작으로 만들었다.  
루비 gem 버전 관련 삽질한 건 패스.

그리고 테마는 [여기][jekyll-themes]서 선택.  
너무나 많은 테마들이 있어서 테마 찾는데만도 시간이 너무 걸릴 것 같아 첫 몇 페이지에서 맘에 들면서 간단해 보이는걸로 선택했다.  
처음부터 너무 복잡하면 사전 지식이 없는 내가 익숙해 지기도 오래 걸릴 것 같아서.  
(그런데 다른 것보다 css에 투자한 시간이 한 80% 이상은 된 듯...)

블로그 기본 테마는 [이것][flexible-theme]으로 하여, 다른 것들도 참조해 가며 이것 저것 수정하고 삭제하고 덧 붙이고 했다.  
선택은 하긴했는데, 코드 리펙토링도 시간이 좀 걸렸다.



이걸 설치하며 습득한 지식과 문제점 및 해결한 과정을 모두 정리하기엔 또 너무 시간을 잡아먹을 것 같으니,
우선 가장 최근에 경험한 문제에 대해 정리해보자.

## GitHub 에서 호스팅

블로그 제작에만 너무 투자를 하지 말아야 겠다는 생각이 든 후 우선 진행 된 것부터 깃허브에 올리기로 결심,
(딱 여기까지 쓰고도 스타일 수정한 건 안 비밀.. 😑 )  
로컬에서 빌드 잘 되고, 실행도 잘 되니 일단 올리고 어떻게 나오나 확인하자 하며 remote 저장소에 push를 했다.

그런데 여기서 1차 문제 발생. 
블로그 페이지가 뜨지 않는다.

무엇이 문제일까 생각하며 git repository setting에 들어갔더니 GitHub Pages 부분에 에러 메시지가 떠있다.

> Unable to build page. Please try again later.

뭐 특별한 이유가 써 있는 것도 아니고 그냥 빌드할 수 없다니 뭘 어쩌라는 건가..
그러다 갑자기 어딘가에서 본, 에러가 나면 메일로 내용이 날아온다는 것이 떠올랐다.  
바로 메일을 확인해보니 역시 깃허브로부터 한 통 날아와 있다.

그러나 역시 에러 메시지는 위와 같다.
하지만 더 많은 정보를 보기 위한 링크도 같이 보내줬으니 어디 한 번 가보자. 에러가 발생했을 때 참고할 내용들이 정리되어 있다.

[Troubleshooting GitHub Pages builds](" https://help.github.com/articles/troubleshooting-jekyll-builds")

다행히 위 주소의 목록 중 Generic Jekyll build failures 에서 원인을 찾을 수 있었다.

> Unverified email address
>> To trigger a build, the user who pushes a commit to the Pages repository must have a verified email address.
>> After you verify an email address, your GitHub Pages sites will build automatically.

문제는 내 **로컬 git config에 설정된 이메일과 github pages를 사용할 remote repository 계정의 이메일이 달라서 발생**한 것이었다.
로컬에서 이런 저런 작업을 하며 환경 설정을 수정했었는데, 그걸 그대로 둔 것이었다.

원인을 찾았으니 로컬 환경설정 수정을 했다.

{% highlight bash linenos %}
git config --global user.name [사용자이름]
git config --global user.email [이메일 주소]
{% endhighlight %}

이렇게 수정하고 바로 push 시도를 하면 소스에 변경된 것이 없어서 업데이트하지 않는다. 그래서 그냥 아무거나 하나 수정하고 다시 커밋 후 푸시 했다.

그렇게 이젠 잘 될 거라 믿었는데,,,, 2차 문제 발생.
이젠 아예 안 뜨는게 아니라 뜨다 만다. 정확히는 아래 이미지처럼 메뉴는 뜨고 글 리스트가 보이지 않는다.

{% assign img_url = "/main_abnormal.png" | prepend: site.image_url %}

[![main_abnormal]({{ img_url }}){: width="300px" : title="click to view" : .center-img}]({{ img_url }})

포스트가 없으면 리스트가 안 뜨는게 정상이겠지만 위에 보는 것과 같이 포스트의 갯수는 카운트가 되어있다.  
이건 깃혀브의 빌드 오류도 아니라 에러 메시지가 있는 것도 아니고 처음 문제보다 참 당황스럽고 멘붕이었지. 😨  
그러다가 하나의 페이지 주소를 직접 입력해서 접속해 보았다.  
어라 제대로 뜨네??  
그리고 이번엔 메인의 리스트와 같은 코드를 사용하는 태그 페이지를 주소창에 입력했더니 태그 리스트는 제대로 나온다.  
아 뭔가 조금씩 실마리가 보이는 것 같다..  
메인 페이지는 카테코리 레이아웃을 사용하는데, 카테고리 별로 페이지네이션을 하기 위해 jekyll-paginate-v2 를 사용했다.  
깃허브 페이지는 jekyll-paginate v1을 지원하고, v2는 지원하지 않는다.


## GitHub pages 에서 Jekyll plugin 사용

그리하여 지원하지 않는 플러그인을 사용하는 법을 검색.

[Adding Jekyll plugins to a GitHub Pages site](https://help.github.com/articles/adding-jekyll-plugins-to-a-github-pages-site/)

위 링크에서 

>> the only way to incorporate them in your site is to generate your site locally and then push your site's static files to your GitHub Pages site.

이 것을 보고 단순히 작업 소스와 같이 _site 폴더를 함께 올리면 되는 건줄 알았다 (원래 _site 는 gitignore에 넣어둠).  
후훗 그게 그냥 될리가 없지.  
얼마간의 삽질을 더 거친 후, 오로지 빌드된 _site의 내용들만 master 브랜치에 올려두어야 한다는 것을 알았다.

아 **여기서 잠시 집고 넘어 갈 것**은, 깃허브 페이지의 종류가 두 가지가 있다는 것.
처음에 제대로 이해하지 못해서 삽질의 시간이 길어졌다. 😑  
repository의 이름을 **[user name].github.io** 로 하면 자동으로 해당 사용자 깃허브 페이지를 생성하며, 오로지 마스터 브랜치만을 깃허브 호스트로 사용할 수 있다.  
그리고 사이트의 주소는 그대로 **http(s)://[user name].github.io** 가 된다.
여기서 'user name'은 깃허브 아이디가 되겠다.

두번째는, 프로젝트 페이지 사이트(Project Pages sites) 라고 깃허브에서 설명하고 있는 것으로,  
모든 깃허브 repository의 settings에서 각각 깃허브 페이지 활성화 설정을 할 수 있고, 호스트에 사용될 브랜치 선택도 할 수 있다.  
주소는 **http(s)://[user name].github.io/[repository name]**  
여기서 'user name' 도 깃허브 아이디이다.  

자세한 내용은 [깃허브 헬프](https://help.github.com/articles/user-organization-and-project-pages/#project-pages) 에서 확인.


이 걸 몰라서 지킬 플러그인 적용 방법을 검색하며 엄청 햇갈렸었다.  
난 이미 repository를 내 깃허브 아이디를 사용하여 sunyrora.github.io 로 생성해 놓고 작업을 한 상태였는데,
master말고 다른 브랜치를 호스트로 설정하라는 말을 보며, '난 마스터 밖에 설정 못하는데??' 하면서 이해를 할래야 할 수가 없었던 거지. 
어찌어찌 두 종류의 페이지가 있다는 것을 알았고, 이젠 나처럼 첫 번째 종류의 페이지로 생성을 한 경우 _site 빌드 파일을 어떻게 올리느냐가 남았다.  

어떤 사람은 repository를 두 개를 만들어서 하나는 소스관리용으로, 하나는 페이지 호스트용으로 쓴다는데,  
그러면 관리가 좀 번거로워 질 것 같고, 나는 맘에 안든다.  
그러다가 하나의 repository에서 브랜치를 이용하여 관리하는 방법을 이해하기 쉽게 설명해 놓은 [블로그](https://drewsilcock.co.uk/custom-jekyll-plugins)를 발견했다.

방법을 요약해 보면,
* 로컬에 마스터 말고 다른 브랜치를 생성하여 소스 관리용으로 사용한다(remote의 branch 에 연결).
* remote 의 master에는 로컬에서 빌드 된 _site의 결과물만을 올린다.
* 여기엔 .nojekyll 이라는 이름의 빈 파일을 함께 올린다.

요약만 하면 이게 다다.  
이걸 이해하기 위해 그 많은 삽질을 해야 했을 뿐이지.  
아마도 누가 이렇게 딱 세 줄로 적어 놓은 걸 봤다해도 처음엔 이해하지 못했겠지?

### 자 그럼 _site의 결과물을 remote master에 어떻게 올릴 것인가.

위에 링크한 블로그에서 설명한 방법은 _site 폴더에 따로 git init 으로 repository를 생성하여 remote master에 연결해 push 하는 방법이다. 그리고 소스는 별도의 브랜치로 관리한다.  
처음엔 그 방법 그대로 적용해 보았다. 아주 잘 작동되고, remote ropository도 한 프로젝트로 관리할 수 있으니 괜찮은 방법이다.  
그런데 한 가지 문제점은 로컬에는 git repository가 두 개로 분리 되어 있는 상홍이기 때문에 두 개의 프로젝트를 관리하는 것과 큰 차이점이 없다는 것이었다. 커밋을 각각의 폴더에서 따로 매 번 해줘야 하는 것이다.  
쓸만하지만 역시 맘에 드는 방법은 아니다.

이번엔 원리를 이해했으니 로컬에서도 한 개의 repository로 브랜치를 사용하여 소스관리와 빌드 파일 배포를 한 번에 할 수 있는 방법을 생각해볼 수 있었다.

git 명령어 중 소스의 특정 폴더를 프로젝트의 root로 만들 수 있는 명령이 있다는 것을 찾을 수 있었다.
바로 **filter-branch** 다. 이 명령어의 **--subdirectory-filter** 옵션을 사용하면 지정한 브랜치의 서브폴더가 루트로 변경된다.

사실 이 명령어에 대해 검색하고, git [한글 설명](https://git-scm.com/book/ko/v1/Git-%EB%8F%84%EA%B5%AC-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EB%8B%A8%EC%9E%A5%ED%95%98%EA%B8%B0)(페이지의 거의 마지막)과 [영어 설명](https://git-scm.com/docs/git-filter-branch)을 봐도 그 많은 것들을 다 이해할 수는 없었다. 😰  

이 [블로그](https://manishearth.github.io/blog/2017/03/05/understanding-git-filter-branch/)를 발견했는데, 아직 다 읽지도, 이해하지도 않았지만 잘 정리되어 있는 것 같다.
어쨌든 현재 필요한 기능은 이것 저것 테스트 해보면 어찌 작동하는지 알게 됐다. (작업하던 소스 히스토리가 하나도 남지 않게 됐다....)

그럼 과정을 하나 하나 정리해 보자.  
결과적으로 하는 일은 위에 언급한 세 가지로 같으니 하는 방법은 여러가지가 있겠지만, 내가 한 과정은 이렇다.

1. 로컬에 소스관리를 할 branch를 하나 만들고 checkout. (master 브랜치에서 작업하던 중인 것으로 가정)
    위의 링크에는 source 라는 브랜치를 만들었는데, 난 gh-pages로 했다. 처음 깃허브 설명서를 보며 만든 브랜치라 그냥 두기로 했다.

2. 생성한 branch를 remote에 push.(깃허브 repository가 remote로 추가 되지 않았다면 먼저 추가)
    깃허브에 현재 push 한 branch가 생성된다.

3. 깃허브의 프로젝트 세팅의 branches 메뉴에 들어가서 default branch를 방금 생성된 branch로 변경
   (이제 master branch를 삭제할 수 있다. - 빌드된 _site 의 내용을 올려야 하기 때문에 기존 있는 내용은 삭제해야 한다.)

4. 그리고 로컬과 remote의 master branch 모두 삭제. (로컬에선 방금 생성한 branch 에 checkout 한 상태여야 한다.)

5. 이젠 로컬과 remote에 새로 생성한 branch(나의 경우 gh-pages)만 남아있는 상태이다.

6. 로컬 gh-pages 에서 지킬 빌드.
    - 이미 빌드가 된 상태로 _site의 모든 내용도 커밋이 된 상태라면 넘어가도 된다.
    - 빌드하여 새로 생성된 파일들을 커밋한다.
    (커밋할 때 .gitignore 에 _site가 추가되어 있으면 안된다.)

7. 로컬에서 master branch를 새로 생성하고 checkout.

8. 이제 여기서 filter-branch로 빌드된 _site 폴더를 루트로 만든다.

9. master branch의 내용은 빌드된 _site 폴더의 내용이 되고, gh-pagse에는 모든 소스가 남아있다.

10. remote 에 push all 하면 끝이다.


장황하게 길게 써진 것 같은데, 모르는 상태에서는 설명이 없이 이해하기 힘들었기 때문에 각 과정을 이해한 대로 정리해 보았다.  
언제나 그렇듯 알고나면 별거 없는..

그럼 이제 긴 설명만 할 것이 아니라 실제 작업을 보자.


{% highlight bash linenos %}
# local branch 생성 후 체크아웃
git checkout -b gh-pages

# push to remote
git push origin gh-pages
{% endhighlight %}

그 다음 github site에서 default branch 변경한 후

{% highlight bash linenos %}
# remote master branch 삭제
git push origin :master

# 로컬 master branch 삭제
git branch -D master
{% endhighlight %}

로컬에서 jekyll 빌드 후 커밋

{% highlight bash linenos %}
# 로컬 master branch 생성 후 체크아웃
git checkout -b master

# _site 폴더를 루트로 만들기
# @ 또는 HEAD는 현재 브렌치의 HEAD를 의미
git filter-branch --subdirectory-filter _site -f @

# remote push all
git push --all
{% endhighlight %}


아 한 가지 빠트린 부분은 .nojekyll을 _site 폴더에 함께 빌드하기 위해 _config.yml 에 

``` yml
include: 
  - .nojekyll
```

이렇게 추가해 주었다.(이 방법이 맞는건진 모르겠다.)


이제 깃허브 페이지 주소로 가서 확인해 보니 

{% assign img_url = "/main_normal.png" | prepend: site.image_url %}
[![sunyrora blog]({{ img_url }}){: width="300px" : title="click to view" : .center-img}]({{ img_url }})

정상적으로 잘 동작한다.


### 주의사항

이 방법으로 하면 하나의 커밋으로 소스관리와 빌드 관리를 할 수 있는 장점이 있다.  
그러나 소스 변경할 땐 반드시 gh-pages(혹은 생성한 branch 명) branch로 checkout 상태여야 하고,
매번 빌드한 후 remote에 적용할 때마다 로컬의 마스터 삭제와 서브디렉토리 필터 과정을 거쳐야 하는 단점이 있다.
그러나 이건 명령어를 쉘로 만들어 두면 귀찮은 과정이 조금은 줄어 들겠지.


## 마치며

쉽게 생각하고 시작한게 은근 고생할 줄이야..  
이 글 하나 작성하는데도 적지 않은 시간이 걸렸다.  
작성하는 중간에도 수정 사항이 보여서 수정하고, 문제 해결도 하고, 한 번 더 확인하고...  
그래도 아직도 추가해야할 것도 손봐야 할 것도 많다.ㅜㅜ

원래 목적을 잃지 않게 균형 잘 잡아야겠다.........



[jekyll-home]: https://jekyllrb.com
[github-pages]:   https://help.github.com/categories/customizing-github-pages/
[jekyll-themes]: http://jekyllthemes.org/
[flexible-theme]: http://jekyllthemes.org/themes/flexible-jekyll/