import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextareaAutosize from "react-textarea-autosize";
import { useField } from "formik";
import Button from "../actions/Button";
import { useContext } from "react";
import ModalContext from "../../Context/Modal/ModalContext";
import TinySquare from "../layouts/TinySquare";
import Hr from "../layouts/Hr";
import Markdown from "../../Images/Markdown";

const MarkdownInput = ({
  noLabel = false,
  label,
  secondaryLabel,
  className,
  maxChar = 2500,
  bg = "bg-dark-background",
  preview = "modal", // or inline
  ...props
}) => {
  const [field, meta] = useField(props);

  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);

  // Handlers
  const handlePreview = () => {
    setModalComponent(<ModalPreviewComponent value={field.value} />);
    setModalProps({
      title: "Markdown preview.",
      variant: "success",
      action: true,
      secondary: (
        <Button
          className="whitespace-nowrap text-whites-dark text-2xs -mb-0.5"
          onClick={offModal}
          text="Okay"
          variant="dark"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      ),
    });
    setModal("full");
  };

  const handleHowTo = () => {
    setModalComponent(<ModalHowToComponent />);
    setModalProps({
      title: "Markdown cheat sheet.",
      variant: "info",
      action: true,
      secondary: (
        <Button
          className="whitespace-nowrap text-whites-dark text-2xs -mb-0.5"
          onClick={offModal}
          text="Okay"
          variant="dark"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      ),
    });
    setModal("full");
  };

  if (preview === "modal")
    return (
      <div className="w-full flex flex-col flex-grow text-whites-light space-y-1 ">
        <div className="w-full flex items-center justify-between">
          <label className="pl-1 text-xs" htmlFor={props.id || props.name}>
            {label}
          </label>
          <span className="text-2xs font-light tracking-tight opacity-50 p-1">
            <span className="text-2xs tracking-wide flex space-x-1 justify-center items-center text-whites-light pr-2">
              <span>supports Markdown</span> <Markdown className="w-5" />
            </span>
          </span>
        </div>
        <TextareaAutosize
          minRows={5}
          className={`w-full text-xs  focus:ring-transparent ${bg} rounded-lg  focus:ring-offset-transparent border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-10`}
          {...field}
          {...props}
        />
        <div className="flex space-x-2 items-center justify-between text-2xs text-whites-light">
          <span className="ml-2 px-1 py-0.5 bg-dark-backgroundDarker rounded-sm">
            {field.value.length}
            <span className="font-sans">/</span>
            {maxChar}
          </span>
          <div className="flex space-x-2 items-center">
            <Button
              onClick={handleHowTo}
              text={
                <span className="opacity-80 hover:opacity-100 hover:underline text-xs">
                  How to use markdown
                </span>
              }
              textOnly
              className="font-light"
            />
            <Button
              className="border border-dark-backgroundDark border-opacity-25"
              onClick={handlePreview}
              text="Preview"
              variant="light"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>
        </div>
        {meta.touched && meta.error ? (
          <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
        ) : null}
      </div>
    );

  if (preview === "inline")
    return (
      <div className="w-full flex flex-col flex-grow text-whites-light space-y-1 ">
        <div className="w-full flex items-center justify-between">
          <label className="pl-1 text-xs" htmlFor={props.id || props.name}>
            {label}
          </label>
          <span className="text-2xs font-light tracking-tight opacity-60 p-1">
            <span className="text-3xs tracking-wide flex space-x-1 justify-center items-center text-whites-light pr-2">
              <span>supports Markdown</span> <Markdown className="w-3.5 h-3" />
            </span>
          </span>
        </div>
        <TextareaAutosize
          minRows={5}
          className={`w-full text-xs  focus:ring-transparent ${bg} rounded-lg  focus:ring-offset-transparent border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-10`}
          {...field}
          {...props}
        />
        <div className="flex space-x-2 items-center justify-between text-2xs text-whites-light">
          <span className="ml-2 px-1 py-0.5 bg-dark-backgroundDarker rounded-sm">
            {field.value.length}
            <span className="font-sans">/</span>
            {maxChar}
          </span>
          <div className="flex space-x-2 items-center">
            <Button
              onClick={handleHowTo}
              text={<span className="underline">How to use markdown</span>}
              textOnly
              className="opacity-80 font-light"
            />
          </div>
        </div>
        <div className="pt-8 w-full self-center">
          <Hr className="text-whites-dark opacity-10 w-full self-center" />
        </div>
        <div className="pt-8 w-3/4 flex flex-col space-y-2">
          <div className="text-sm font-medium text-whites-light uppercase">
            <div className="flex items-center">
              <TinySquare size="medium" className="bg-blacks-dark" />
              <div>Markdown Preview:</div>
            </div>
          </div>
          <Hr className="text-whites-dark opacity-10 w-3/4" />
        </div>
        <div className="flex flex-col space-y-2 flex-shrink">
          <ModalPreviewComponent value={field.value} minHeight="min-content" />
        </div>
        {meta.touched && meta.error ? (
          <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
        ) : null}
      </div>
    );
};

export default MarkdownInput;

const ModalPreviewComponent = ({ value, minHeight = "350px" }) => {
  return (
    <div
      className="text-whites-light flex flex-col space-y-4 py-4 px-6"
      style={{ minHeight: minHeight }}
    >
      <div className="text-base font-medium flex space-x-2 justify-center items-center self-start">
        <span>Markdown preview</span>
        <Markdown className="w-5" />
      </div>
      <Hr className="text-whites-dark opacity-10 w-2/3" />
      <div className="bg-dark-backgroundDark bg-opacity-40 px-3 py-4 rounded-md">
        <ReactMarkdown
          disallowedElements={["img"]}
          className="markdown mobile"
          remarkPlugins={[remarkGfm]}
        >
          {value}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const ModalHowToComponent = () => {
  return (
    <div className="text-whites-light flex flex-col space-y-2 py-4">
      {/* Headings */}
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-1 items-center py-1">
          <TinySquare size="medium" className="bg-blacks-dark" />
          <span>Headings</span>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-1">
            <div className="text-3xl">Heading 1</div>
            <div className="pl-0.5 text-2xs italic text-whites-dark opacity-80 font-light tracking-tight">
              Markdown
            </div>
            <div className="text-xs py-3 px-2 bg-dark-backgroundDarker rounded-md text-whites-dark font-light">
              # Heading 1
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-1">
            <div className="text-2xl">Heading 2</div>
            <div className="pl-0.5 text-2xs italic text-whites-dark opacity-80 font-light tracking-tight">
              Markdown
            </div>
            <div className="text-xs py-3 px-2 bg-dark-backgroundDarker rounded-md text-whites-dark font-light">
              ## Heading 2
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-1">
            <div className="text-base">Heading 3</div>
            <div className="pl-0.5 text-2xs italic text-whites-dark opacity-80 font-light tracking-tight">
              Markdown
            </div>
            <div className="text-xs py-3 px-2 bg-dark-backgroundDarker rounded-md text-whites-dark font-light">
              ### Heading 3
            </div>
          </div>
        </div>
        <div>
          <span className="text-2xs opacity-80">
            .. and so forth for Heading 4, 5 and 6
          </span>
        </div>
      </div>
      <div>
        <Hr className="w-full text-whites-dark opacity-25 mt-2" />
      </div>
      {/* Text decoration */}
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-1 items-center py-1">
          <TinySquare size="medium" className="bg-blacks-dark" />
          <span>Text decoration</span>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-bold">Bold</div>
            <div className="pl-0.5 text-2xs italic text-whites-dark opacity-80 font-light tracking-tight">
              Markdown
            </div>
            <div className="text-xs py-3 px-2 bg-dark-backgroundDarker rounded-md text-whites-dark font-light">
              **Bold**
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-1">
            <div className="text-sm italic">Italic</div>
            <div className="pl-0.5 text-2xs italic text-whites-dark opacity-80 font-light tracking-tight">
              Markdown
            </div>
            <div className="text-xs py-3 px-2 bg-dark-backgroundDarker rounded-md text-whites-dark font-light">
              *Italic*
            </div>
          </div>
        </div>
      </div>
      <div>
        <Hr className="w-full text-whites-dark opacity-25 mt-2" />
      </div>
      {/* Tables */}
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-1 items-center py-1">
          <TinySquare size="medium" className="bg-blacks-dark" />
          <span>Table</span>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="markdown mobile flex flex-col space-y-1">
            <table>
              <thead>
                <tr>
                  <th>Header 1</th>
                  <th>Header 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data 1A</td>
                  <td>Data 2A</td>
                </tr>
                <tr>
                  <td>Data 1B</td>
                  <td>Data 2B</td>
                </tr>
              </tbody>
            </table>
            <div className="pl-0.5 text-2xs italic text-whites-dark opacity-80 font-light tracking-tight">
              Markdown
            </div>
            <div className="text-xs py-3 px-2 bg-dark-backgroundDarker rounded-md text-whites-dark font-light">
              | Header 1 | Header 2 | <br /> | --- | --- | <br /> | Data 1A |
              Data 2A | <br /> | Data 1B | Data 2B |
            </div>
          </div>
        </div>
      </div>
      <div>
        <Hr className="w-full text-whites-dark opacity-25 mt-2" />
      </div>
      {/* Misc */}
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-1 items-center py-1">
          <TinySquare size="medium" className="bg-blacks-dark" />
          <span>Miscellanies</span>
        </div>

        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-1">
            <blockquote className="text-sm">
              <p>blockquote</p>
            </blockquote>
            <div className="pl-0.5 text-2xs italic text-whites-dark opacity-80 font-light tracking-tight">
              Markdown
            </div>
            <div className="text-xs py-3 px-2 bg-dark-backgroundDarker rounded-md text-whites-dark font-light">
              {`>`} blockquote
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-1">
            <div className="text-sm">
              <ol className="py-1">
                <li>Ordered Item</li>
              </ol>
              <ul className="py-1">
                <li>Unordered Item</li>
              </ul>
            </div>
            <div className="pl-0.5 text-2xs italic text-whites-dark opacity-80 font-light tracking-tight">
              Markdown
            </div>
            <div className="text-xs py-3 px-2 bg-dark-backgroundDarker rounded-md text-whites-dark font-light">
              1. Ordered Item <br /> - Unordered Item
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-1">
            <div className="text-sm flex flex-col space-y-1">
              <span>Horizontal line</span>
              <span>
                <hr />
              </span>
            </div>
            <div className="pl-0.5 text-2xs italic text-whites-dark opacity-80 font-light tracking-tight">
              Markdown
            </div>
            <div className="text-xs py-3 px-2 bg-dark-backgroundDarker rounded-md text-whites-dark font-light">
              Horizontal line
              <br />
              ---
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-1">
            <div className="text-sm underline text-info">Link</div>
            <div className="pl-0.5 text-2xs italic text-whites-dark opacity-80 font-light tracking-tight">
              Markdown
            </div>
            <div className="text-xs py-3 px-2 bg-dark-backgroundDarker rounded-md text-whites-dark font-light">
              [Link](https://www.example.com)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
