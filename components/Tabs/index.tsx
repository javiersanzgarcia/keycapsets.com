import React, { useContext } from 'react';

import Tab from './Tab';
import Context from '../../context';
import Select from '../Select';

interface TabsProps {}

function Tabs(props: TabsProps): JSX.Element {
    const { } = props;
    const state = useContext(Context);

    function setSelectState() {

    }

    return (
        <div className="filters">
            <div className="tabs">
                <label className="label">Choose your keycap type</label>
                <ul>
                    {state.tabs.map((tab: String, idx: number) => <Tab id={tab} key={idx} />)}
                </ul>
            </div>
            <div className="select">
                <Select
                    label="Filter caps by type"
                    name="Choose type"
                    onSelectChange={(selectedFilterValue) => state.setGlobalState({ activeTab: selectedFilterValue })}
                    values={state.tabs.map((t) => ({ id: t, name: t }))}
                />
            </div>
        </div>
    )
}

export default Tabs;
