import React, { useEffect, useMemo, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import TitleWithInfo from '../components/common/Downloads/TitleWithInfo';
import TitleWithLinkCard from '../components/common/TitleWithLinkCard';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '../components/ui/input.jsx';
import LinkWithTitleCard from '../components/common/LinkWithTitleCard';
import ContactDetailsCard from '../components/common/ContactDetailsCard';
import Breadcrumbs from '../components/common/Breadcrumbs';
import apiClient from '../auth/ApiClient.jsx'; // Adjust the path as necessary
import { toast } from 'react-toastify';

/* Debounce Function */
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/* Menu Tabs lists */
const navbarMenuList = [
  {
    id: 'm1',
    title: 'Ledger Wing',
  },
  {
    id: 'm2',
    title: 'Transportation Wing',
  },
  {
    id: 'm3',
    title: 'Central Wing',
  },
];

function Downloads() {
  const [documents, setDocuments] = useState([]); // Loaded documents from API
  const [currentTab, setCurrentTab] = useState('Ledger Wing');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  /* Fetch documents from the API */
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await apiClient.get('/document'); // API call
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
        toast.error('Failed to fetch documents.');
      }
    };
    fetchDocuments();
  }, []);

  /* Handle Search */
  const handleSearch = debounce((value) => {
    setDebouncedSearch(value);
  }, 300);

  /* Memoized filtered list */
  const filteredLists = useMemo(() => {
    return documents.filter((doc) =>
      doc.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, documents]);

  return (
    <div className="space-y-10 pb-20">
      <Breadcrumbs title="Downloads" />
      <div className="px-custom py-14 w-full h-full space-y-10">
        {/* Button */}
        <div className="w-full flex">
          <div className="flex items-center h-full w-full">
            <TransitionGroup component={null}>
              {navbarMenuList.map((item) => (
                <CSSTransition
                  key={item.id}
                  timeout={300}
                  classNames="navLink"
                  unmountOnExit
                >
                  <Button
                    variant={currentTab === item.title ? 'default' : 'hover'}
                    size="lg"
                    onClick={() => setCurrentTab(item.title)}
                    className="w-full h-16 text-lg"
                  >
                    {item.title}
                  </Button>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-10">
          {currentTab === 'Ledger Wing' && (
            <div className="flex flex-col space-y-10">
              <TitleWithInfo
                title="Ledger Wing"
                subtitle="Ledger wing section maintains the IRLAs of all the Officers for prompt and correct authorization of the Pay and Allowances."
              />
              <div className="grid grid-cols-3 gap-6 h-full">
                <TitleWithLinkCard title="Downloads">
                  <ul className="grid grid-cols-2 gap-3 list-disc list-inside overflow-y-auto">
                    {filteredLists.map((doc) => (
                      <LinkWithTitleCard
                        key={doc.id}
                        title={doc.title}
                        link={`http://localhost:8888/${doc.documentPath}`} // Use documentPath from API
                      />
                    ))}
                  </ul>
                </TitleWithLinkCard>
              </div>
              <Separator className="my-4 h-1" />
            </div>
          )}

          {/* Other tabs with placeholders */}
          {currentTab === 'Transportation Wing' && (
            <div className="flex flex-col space-y-10">
              <TitleWithInfo
                title="Transportation Wing"
                subtitle="Transportation Wing deals with Audit and Payment of Personal Claims for Temporary Duty, Leave Travel Concession, Permanent Posting, Courses, etc."
              />
              <div className="grid grid-cols-3 gap-6 h-full">
                <TitleWithLinkCard title="Downloads">
                  <ul className="grid grid-cols-2 gap-3 list-disc list-inside overflow-y-auto">
                    {filteredLists.map((doc) => (
                      <LinkWithTitleCard
                        key={doc.id}
                        title={doc.title}
                        link={`http://localhost:8888/${doc.documentPath}`} // Use documentPath from API
                      />
                    ))}
                  </ul>
                </TitleWithLinkCard>
              </div>
              <Separator className="my-4 h-1" />
            </div>
          )}
        </div>

        {/* Search */}
        <div className="flex flex-row-reverse w-full">
          <div className="w-fit flex gap-2">
            <Input
              type="text"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
              className="rounded-2xl h-full border-none bg-adminBreadCrumbsBg w-[350px] max-w-[450px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Downloads;
