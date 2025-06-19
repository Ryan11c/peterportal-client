import { FC, useState } from 'react';
import './index.scss';
import Planner from './Planner';
import SearchSidebar from './SearchSidebar';
import { useAppSelector } from '../../store/hooks';
import AddCoursePopup from './AddCoursePopup';
import { useIsMobile } from '../../helpers/util';
import { CSSTransition } from 'react-transition-group';
import TransferCreditsMenu from './transfers/TransferCreditsMenu';

const RoadmapPage: FC = () => {
  const showSearch = useAppSelector((state) => state.roadmap.showSearch);
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <div className="roadmap-page">
        <AddCoursePopup />
        <div className={`main-wrapper ${isMobile ? 'mobile' : ''}`}>
          <Planner />
        </div>
        {!isMobile && (
          <div className="sidebar-divider">
            <button
              className="sidebar-collapse-btn"
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {/* <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              >
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  stroke="#1976d2"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
            </button>
          </div>
        )}
        <CSSTransition in={!isMobile || showSearch} timeout={500} unmountOnExit>
          <SearchSidebar collapsed={sidebarCollapsed} />
        </CSSTransition>
        {isMobile && <TransferCreditsMenu />}
      </div>
    </>
  );
};

export default RoadmapPage;
