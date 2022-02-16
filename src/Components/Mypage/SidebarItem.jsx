import React from 'react';
// import style from './style.jsx';

function SidebarItem() {
  const menus = [
    { name: '내 정보', path: '/mypage/userinfo/' },
    { name: '입양 신청 현황', path: '/mypage/assigninfo/' },
    { name: '내가 쓴 글', path: '/mypage/myposts/' },
    { name: '1:1 문의 글', path: '/mypage/myinquiry/' },
  ];
  return (
    <div className="inline-block">
      <ul className="text-black">
        {menus.map((a) => (
          <li className="block cursor-pointer p-2 hover:bg-blue-300 hover:text-pink-700">
            <i className="w-8 fas fa-search p-2 bg-orange-300 rounded-full mx-2">
              {a.name}
            </i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarItem;
