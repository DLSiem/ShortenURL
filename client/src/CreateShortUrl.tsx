import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { createShortUrl } from "./urlSlice";
import { Button, Input, Alert, Tooltip } from "@material-tailwind/react";
import { useCopyToClipboard } from "usehooks-ts";
import { DocumentDuplicateIcon, CheckIcon } from "@heroicons/react/24/outline";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

const CreateShortUrl = () => {
  const [text, copy] = useCopyToClipboard();
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const dispatch = useAppDispatch();
  const url = useAppSelector((state) => state.url);

  const { loading, error } = url;
  const { shortUrl } = url.urls || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createShortUrl(originalUrl));
    setOriginalUrl("");
  };

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setTimeout(() => {
        setOpenError(false);
      }, 1000);
    } else if (shortUrl) {
      setOpenSuccess(true);
      setTimeout(() => {
        setOpenSuccess(false);
      }, 1000);
    }
  }, [error, shortUrl]);

  const handleCopy = (url: string) => () => {
    copy(url);
    setCopied(true);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <div className=" w-96">
      <>
        <Alert
          open={open}
          className="absolute z-10 flex w-96 border-2 gap-2 bg-gray-100 shadow-sm p-2 rounded-md"
          animate={{
            mount: { y: -10, x: 0 },
            unmount: { y: 100, x: 30 },
          }}
        >
          <div className="flex items-center">
            <FaCheckCircle className="text-green-600 w-6 h-6" />
            <p className="ml-2 text-gray-800 font-bold ">
              Copied to clipboard!
            </p>
          </div>
        </Alert>
        {/* success */}
        <Alert
          open={openSuccess}
          className="absolute z-10 flex w-96 border-2 gap-2 bg-gray-100 shadow-sm p-2 rounded-md"
          animate={{
            mount: { y: -10, x: 0 },
            unmount: { y: 90, x: -50 },
          }}
        >
          <div className="flex items-center">
            <FaCheckCircle className="text-green-600" />
            <p className="ml-2 text-gray-800 font-bold">Short Url created!</p>
          </div>
        </Alert>

        {/* error */}
        <Alert
          open={openError}
          className="absolute z-10 flex w-96 border-2 gap-2   bg-gray-100 shadow-sm p-2 rounded-md"
          animate={{
            mount: { y: -10, x: 0 },
            unmount: { y: -10, x: 300 },
          }}
        >
          <div className="flex items-center">
            <MdOutlineError className="text-red-600 w-6 h-6" />
            <p className="ml-2 text-red-700 font-bold ">{error}</p>
          </div>
        </Alert>
      </>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Create a Short URL
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="text"
            value={originalUrl}
            variant="outlined"
            label="Original URL"
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter original URL"
            className="p-2 border rounded-md w-full"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            crossOrigin=""
          />
        </div>
        <Button
          type="submit"
          className="  text-white px-4 py-2 rounded-md"
          color="green"
          disabled={url.loading}
          placeholder={""}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          {loading ? "Creating..." : "Create"}
        </Button>
      </form>

      <div className="mt-5">
        {url.urls && (
          <>
            <div className="flex items-center gap-4">
              <div className="w-72">
                <Input
                  value={shortUrl}
                  placeholder="Enter to copy"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={() => {}}
                  containerProps={{ className: "min-w-[100px]" }}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  crossOrigin=""
                />
              </div>
              <Tooltip
                position="top"
                content={copied ? "Copied" : ` ${text || shortUrl}`}
                className="flex items-center gap-2 text-xs"
              >
                <Button
                  size="md"
                  onMouseLeave={() => setCopied(false)}
                  onClick={shortUrl ? handleCopy(shortUrl) : undefined}
                  className="flex items-center gap-2"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  {copied ? (
                    <>
                      <CheckIcon className="h-4 w-4 text-white" />
                      Copied
                    </>
                  ) : (
                    <>
                      <DocumentDuplicateIcon className="h-4 w-4 text-white" />
                      Copy
                    </>
                  )}
                </Button>
              </Tooltip>
            </div>
            <Button
              size="md"
              onClick={() => window.open(shortUrl, "_blank")}
              className="flex items-center gap-2 mt-4"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Visit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateShortUrl;
