import {
  Accordion,
  AccordionHeader,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import Checkbox from 'components/Checkbox'
import { ChevronDown, FileIcon, FolderIcon } from 'lucide-react'
import type { FileNode, FolderNode } from 'utils/fs'

interface ArchiveFolderStructureProps {
  fileStructure: FolderNode
  onFileSelect: (file: FileNode) => void
  onFolderSelect: (folder: FolderNode) => void
  selectedFiles: FileNode[]
}
interface FolderProps {
  fileStructure: FolderNode
  folderDepth: number
  onFileSelect: (file: FileNode) => void
  onFolderSelect: (folder: FolderNode) => void
  selectedFiles: FileNode[]
}

const ArchiveFolderStructure = ({
  fileStructure,
  onFileSelect,
  onFolderSelect,
  selectedFiles,
}: ArchiveFolderStructureProps) => {
  return (
    <div className="relative block h-90 max-h-90 overflow-y-scroll rounded-xl">
      <Folder
        folderDepth={0}
        onFileSelect={onFileSelect}
        onFolderSelect={onFolderSelect}
        fileStructure={fileStructure}
        selectedFiles={selectedFiles}
      />
    </div>
  )
}

const Folder = ({
  fileStructure,
  folderDepth,
  onFileSelect,
  onFolderSelect,
  selectedFiles,
}: FolderProps) => {
  const getAllNodes = (folder: FolderNode): (FileNode | FolderNode)[] => {
    let nodes: (FileNode | FolderNode)[] = [...folder.files, ...folder.folders]
    folder.folders.forEach((subFolder) => {
      nodes = [...nodes, ...getAllNodes(subFolder)]
    })
    return nodes
  }

  const getAllFilesFromFolder = (folder: FolderNode): FileNode[] => {
    let files: FileNode[] = [...folder.files]
    folder.folders.forEach((subFolder) => {
      files = [...files, ...getAllFilesFromFolder(subFolder)]
    })
    return files
  }

  const areAllDescendantFilesSelected = (folder: FolderNode): boolean => {
    const allFiles = getAllFilesFromFolder(folder)
    const selectedFilesFullpaths = selectedFiles.map((f) => f.fullpath)
    return allFiles.every((file) => selectedFilesFullpaths.includes(file.fullpath))
  }

  console.log(folderDepth)

  return (
    <Accordion
      type="multiple"
      style={{ paddingLeft: `${folderDepth * 23}px` }}
      defaultValue={['/']}
      disabled={folderDepth === 0}
      className={`mt-2`}
    >
      <AccordionItem value={fileStructure.fullpath}>
        <AccordionHeader className="flex gap-2">
          {folderDepth > 0 && (
            <div className="sticky top-0 flex items-center gap-2">
              <AccordionTrigger className="group cursor-pointer">
                <ChevronDown
                  size={16}
                  className="transition-all duration-150 group-data-[state=open]:-rotate-90"
                />
              </AccordionTrigger>
              <Checkbox
                checked={areAllDescendantFilesSelected(fileStructure)}
                onCheckedChange={() => onFolderSelect(fileStructure)}
              />
              <AccordionTrigger className="flex cursor-pointer items-center gap-2">
                <FolderIcon size={16} />
                <p>{fileStructure.name}</p>
              </AccordionTrigger>
            </div>
          )}
        </AccordionHeader>
        <AccordionContent className="data-[state=closed]:animate-accordion-close data-[state=open]:animate-accordion-open overflow-hidden">
          {fileStructure.folders.map((subFolder) => {
            return (
              <Folder
                fileStructure={subFolder}
                folderDepth={folderDepth + 1}
                onFolderSelect={onFolderSelect}
                onFileSelect={onFileSelect}
                selectedFiles={selectedFiles}
                key={subFolder.fullpath}
              />
            )
          })}
          {fileStructure.files.map((file) => {
            return (
              <label
                style={{ paddingLeft: `${(folderDepth + 1) * 23}px` }}
                key={file.fullpath}
                className="mt-2 flex cursor-pointer gap-2"
              >
                <Checkbox
                  checked={selectedFiles.find((el) => el.fullpath === file.fullpath) !== undefined}
                  onCheckedChange={() => onFileSelect(file)}
                />
                <FileIcon size={16} />
                <p>{file.name}</p>
              </label>
            )
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
export default ArchiveFolderStructure
