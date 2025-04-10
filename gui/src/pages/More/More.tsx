import {
  ArrowTopRightOnSquareIcon,
  DocumentArrowUpIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardShortcuts from "./KeyboardShortcuts";
import { IdeMessengerContext } from "../../context/IdeMessenger";
import { useNavigationListener } from "../../hooks/useNavigationListener";
import { setOnboardingCard } from "../../redux/slices/uiSlice";
import MoreHelpRow from "./MoreHelpRow";
import IndexingProgress from "./IndexingProgress";
import DocsIndexingStatuses from "../../components/indexing/DocsIndexingStatuses";
import PageHeader from "../../components/PageHeader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { saveCurrentSession } from "../../redux/thunks/session";
import { Tab } from "@headlessui/react";

function MorePage({
  currentLanguage="en"
}) {
  useNavigationListener();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ideMessenger = useContext(IdeMessengerContext);
  const disableIndexing = useAppSelector(
    (state) => state.config.config.disableIndexing,
  );

  // Define tab categories with translations
  const categories = [
    { 
      name: currentLanguage === "en" ? "Codebase" : "代码库",
      description: currentLanguage === "en" ? "Local embeddings of your codebase" : "代码库的本地嵌入"
    },
    { 
      name: currentLanguage === "en" ? "Docs" : "文档",
      description: currentLanguage === "en" ? "Documentation indexing status" : "文档索引状态"
    },
  ];

  return (
    <div className="overflow-y-scroll no-scrollbar">
      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="relative backdrop-blur-sm rounded-xl p-6 border mb-6 group transition-all duration-500 overflow-hidden">
          <Tab.Group>
            <Tab.List className="flex flex-wrap gap-2 rounded-xl p-1 mb-4">
              {categories.map((category) => (
                <Tab
                  key={category.name}
                  className={({ selected }) =>
                    `basis-[calc(50%-0.25rem)] flex-grow-0 rounded-lg py-2.5 px-4 text-sm font-medium leading-5 transition-all duration-200
                    ${selected
                      ? "bg-[rgb(255,202,7)] shadow"
                      : ""
                    }`
                  }
                >
                  <span className="flex items-center justify-center gap-2">
                    {category.name}
                  </span>
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels>
              {/* Codebase Knowledge Panel */}
              <Tab.Panel>
                <div className="relative">
                  {/* <h3 className="text-xl font-medium text-[rgb(255,202,7)] mb-4 flex items-center gap-2">
                    <span className="transition-colors duration-300">Codebase Knowledge</span>
                  </h3> */}
                  <span className="text-sm block mb-4">
                    {categories[0].description}
                  </span>
                  
                  {disableIndexing ? (
                    <div className="py-3 text-center font-semibold bg-black/20 rounded-lg">
                      {currentLanguage === "en" ? "Indexing is disabled" : "索引已禁用"}
                    </div>
                  ) : (
                    <IndexingProgress currentLanguage={currentLanguage} />
                  )}
                </div>
              </Tab.Panel>

              {/* Docs Knowledge Panel */}
              <Tab.Panel>
                <DocsIndexingStatuses currentLanguage={currentLanguage} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}

export default MorePage;
