import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import '../../App.css';
import './Notice.css';

function NoticeList() {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [{ data: noticeList, loading, error }, refetch] = useApiAxios(
    `/notice/api/notices/${query ? '?query=' + query : ''}`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <>
      <div className="header">
        <div className="justify-center mx-20 ">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="notice_header rounded-xl shadow-md ">
              <blockquote class="mt-5 text-6xl mb-3 font-semibold italic text-center text-slate-900">
                <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-400 relative inline-block">
                  <span class="relative text-white">" 공지사항 "</span>
                </span>
              </blockquote>

              <div className="ml-10 mb-3 mt-3">
                <div className="text-right">
                  {auth.is_staff && (
                    <button
                      onClick={() => navigate('/admin/notice/new/')}
                      className=" icon_size"
                      readOnly
                    >
                      <img src="/pen.png" alt="button"></img>
                    </button>
                  )}

                  <input
                    type="text"
                    name="query"
                    onChange={getQuery}
                    onKeyPress={handleKeyPress}
                    className="relative rounded p-3 text-xl mb-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 md:w-1/2 px-3 md:mb-0"
                    placeholder="제목을 검색하세요."
                  />

                  <button
                    onClick={() => refetch()}
                    className="relative ml-2 mr-4 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-xl border-4 text-white px-3 py-2 rounded"
                    readOnly
                  >
                    검색
                  </button>
                </div>
              </div>
              <div className="mb-5 overflow-hidden border-b border-gray-200">
                {noticeList && (
                  // 테이블로 표현한 방식 (assignment와 다르게 해볼 예정)
                  <table className="mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                        >
                          제목
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                        >
                          작성시간
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {noticeList.map((notice) => (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="ml-4">
                              <div className="text-xl font-medium text-gray-900">
                                {notice.notice_no}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                <Link to={`/notice/${notice.notice_no}/`}>
                                  <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {notice.title}
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="text-m px-6 py-4 whitespace-nowrap">
                            {notice.created_at}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoticeList;
