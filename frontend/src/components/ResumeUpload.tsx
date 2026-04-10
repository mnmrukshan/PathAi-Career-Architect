"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface ResumeUploadProps {
  onSuccess: (data: any) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/api/v1/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gradient">
            Upload Your Resume
          </h2>
          <p className="text-gray-400">Our AI will analyze your skills and build your roadmap</p>
        </div>

        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer text-center
            ${isDragActive ? "border-violet-500 bg-violet-500/10" : "border-gray-700 hover:border-gray-600 hover:bg-white/5"}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`p-4 rounded-full ${isDragActive ? "bg-violet-500" : "bg-gray-800"}`}>
              <Upload className="w-8 h-8 text-white" />
            </div>
            {file ? (
              <div className="flex items-center space-x-2 text-violet-400">
                <FileText className="w-5 h-5" />
                <span className="font-medium">{file.name}</span>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-lg font-medium">Drag & drop your PDF resume here</p>
                <p className="text-sm text-gray-500">or click to browse files</p>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-xl"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`w-full btn-primary flex items-center justify-center space-x-2 
            ${(!file || loading) ? "opacity-50 cursor-not-allowed grayscale" : ""}
          `}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Your Future...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Start Analysis</span>
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default ResumeUpload;
