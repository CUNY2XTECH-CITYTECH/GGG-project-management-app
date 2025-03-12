import { useState, ReactNode } from 'react';

interface TabsProps {
  children: ReactNode;
}

interface TabProps {
  label: string;
  children: ReactNode;
}

export const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  // Ensure children is always an array
  const tabsArray = Array.isArray(children) ? children : [children];

  return (
    <div>
      <div className="flex border-b">
        {tabsArray.map((child: any, index) => (
          <button
            key={index}
            className={`p-2 ${
              activeTab === index ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="p-4">{tabsArray[activeTab]}</div>
    </div>
  );
};

export const Tab = ({ label, children }: TabProps) => {
  return <div>{children}</div>;
};
