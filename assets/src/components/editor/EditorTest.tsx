import React, { useState } from 'react';
import { Editor } from './Editor';
import { ToolbarItem } from './interfaces';
import { commandDesc as imageCommandDesc } from './editors/Image';
import { olCommandDesc as olCmd, ulCommanDesc as ulCmd } from './editors/Lists';
import { commandDesc as youtubeCommandDesc } from './editors/YouTube';
import { commandDesc as quoteCommandDesc } from './editors/Blockquote';
import { commandDesc as audioCommandDesc } from './editors/Audio';
import { commandDesc as tableCommandDesc } from './editors/Table';
import { RichText } from 'components/activities/types';
import { ModelElement } from 'data/content/model';

const initialStem: RichText = {
  model: ([
    {
      type: 'p',
      children: [{ text: 'This is the editor test view.' }],
    },
    {
      type: 'p',
      children: [
        { text: 'Here is a sentence.' },
      ],
    },

  ] as ModelElement[]),
  selection: null,
};

const toolbarItems: ToolbarItem[] = [
  quoteCommandDesc,
  {
    type: 'GroupDivider',
  },
  olCmd,
  ulCmd,
  {
    type: 'GroupDivider',
  },
  imageCommandDesc,
  youtubeCommandDesc,
  audioCommandDesc,
  {
    type: 'GroupDivider',
  },
  tableCommandDesc,
];

export const TestEditor = () => {
  const [stem, setStem] = useState(initialStem);

  return (
    <div>

      <p><b>Question Stem:</b></p>
      <Editor
        commandContext={ { projectSlug: '' }}
        editMode={true}
        value={stem.model}
        selection={stem.selection}
        onEdit={(model, selection) => {
          setStem({ model, selection });
        }}
        toolbarItems={toolbarItems} />

    </div>

  );
};
